package com.preppilot.backend.dto;

/**
 * Response for GET /api/auth/me - the currently logged-in user.
 */
public record UserResponse(
        Long id,
        String name,
        String email,
        String role
) {}
