package com.preppilot.backend.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.preppilot.backend.dto.ErrorResponse;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * Runs when an unauthenticated request tries to reach a protected endpoint
 * (e.g. GET /api/auth/me with no/expired/invalid token).
 *
 * This is the correct extension point for that case - it happens at the
 * Spring Security filter level, BEFORE the request reaches any controller,
 * so GlobalExceptionHandler (which only sees controller-level exceptions)
 * would never run for this. Without this class, Spring Security falls
 * back to a bare 403 with no body, which doesn't match the JSON error
 * shape the frontend expects.
 */
@Component
@RequiredArgsConstructor
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final ObjectMapper objectMapper;

    @Override
    public void commence(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException authException
    ) throws IOException, ServletException {

        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        ErrorResponse body = new ErrorResponse(
                HttpStatus.UNAUTHORIZED.value(),
                "Unauthorized",
                "Authentication is required to access this resource"
        );

        objectMapper.writeValue(response.getWriter(), body);
    }
}
