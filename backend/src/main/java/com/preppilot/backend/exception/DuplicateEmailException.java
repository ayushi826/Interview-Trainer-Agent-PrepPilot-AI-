package com.preppilot.backend.exception;

/**
 * Thrown when someone tries to register with an email that's already taken.
 * Caught by GlobalExceptionHandler and turned into a 409 Conflict response.
 */
public class DuplicateEmailException extends RuntimeException {
    public DuplicateEmailException(String message) {
        super(message);
    }
}
