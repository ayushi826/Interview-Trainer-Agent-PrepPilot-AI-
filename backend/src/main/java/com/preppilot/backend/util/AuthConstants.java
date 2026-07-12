package com.preppilot.backend.util;

/**
 * Small collection of constants used across the security layer, so the
 * header name / prefix aren't repeated as magic strings in multiple files.
 */
public final class AuthConstants {

    private AuthConstants() {
        // utility class - no instances
    }

    public static final String AUTH_HEADER = "Authorization";
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String ROLE_PREFIX = "ROLE_";
}
