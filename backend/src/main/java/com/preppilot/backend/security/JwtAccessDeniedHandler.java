package com.preppilot.backend.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.preppilot.backend.dto.ErrorResponse;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * Runs when an AUTHENTICATED user tries to access something they don't
 * have permission for (e.g. a non-admin hitting an admin-only route in a
 * future feature). Same reasoning as JwtAuthenticationEntryPoint - this
 * happens at the filter level, so it needs its own handler rather than
 * relying on GlobalExceptionHandler.
 */
@Component
@RequiredArgsConstructor
public class JwtAccessDeniedHandler implements AccessDeniedHandler {

    private final ObjectMapper objectMapper;

    @Override
    public void handle(
            HttpServletRequest request,
            HttpServletResponse response,
            AccessDeniedException accessDeniedException
    ) throws IOException, ServletException {

        response.setStatus(HttpStatus.FORBIDDEN.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        ErrorResponse body = new ErrorResponse(
                HttpStatus.FORBIDDEN.value(),
                "Forbidden",
                "You do not have permission to access this resource"
        );

        objectMapper.writeValue(response.getWriter(), body);
    }
}
