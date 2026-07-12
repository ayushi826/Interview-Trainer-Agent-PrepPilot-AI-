package com.preppilot.backend.dto;

import java.time.LocalDateTime;
import java.util.Map;

/**
 * Standard shape for every error response returned by GlobalExceptionHandler.
 * fieldErrors is only populated for validation failures (null otherwise,
 * omitted from JSON automatically since Jackson skips null fields here
 * only if configured - we simply leave it null and it will serialize as
 * "fieldErrors": null, which is fine and explicit for API consumers).
 */
public record ErrorResponse(
        LocalDateTime timestamp,
        int status,
        String error,
        String message,
        Map<String, String> fieldErrors
) {
    public ErrorResponse(int status, String error, String message) {
        this(LocalDateTime.now(), status, error, message, null);
    }

    public ErrorResponse(int status, String error, String message, Map<String, String> fieldErrors) {
        this(LocalDateTime.now(), status, error, message, fieldErrors);
    }
}
