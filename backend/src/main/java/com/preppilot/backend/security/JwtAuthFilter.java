package com.preppilot.backend.security;

import com.preppilot.backend.util.AuthConstants;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Runs once per request. Looks for "Authorization: Bearer <token>",
 * validates it, and if valid, tells Spring Security "this request is
 * authenticated as this user" so downstream controllers can rely on
 * SecurityContextHolder / @AuthenticationPrincipal.
 *
 * If there's no token, or it's invalid, we simply don't authenticate the
 * request and let it continue - SecurityConfig then decides (based on the
 * requested path) whether that's allowed or results in a 401/403.
 */
@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        String authHeader = request.getHeader(AuthConstants.AUTH_HEADER);

        if (authHeader == null || !authHeader.startsWith(AuthConstants.TOKEN_PREFIX)) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(AuthConstants.TOKEN_PREFIX.length());

        try {
            String email = jwtService.extractEmail(token);

            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(email);

                if (jwtService.isTokenValid(token, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails, null, userDetails.getAuthorities()
                            );
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        } catch (JwtException | IllegalArgumentException ex) {
            // Invalid/expired/tampered token - just leave the request unauthenticated.
            // SecurityConfig will reject it with 401 if the endpoint requires auth.
            SecurityContextHolder.clearContext();
        }

        filterChain.doFilter(request, response);
    }
}
