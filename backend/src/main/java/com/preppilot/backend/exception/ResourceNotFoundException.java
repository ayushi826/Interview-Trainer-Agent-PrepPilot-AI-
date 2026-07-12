package com.preppilot.backend.exception;

/**
 * Thrown when a lookup (e.g. loading the current user by the ID stored in
 * their JWT) doesn't find a matching row. Caught by GlobalExceptionHandler
 * and turned into a 404 Not Found response.
 */
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
