package com.preppilot.backend.dto;

/**
 * Response for POST /api/auth/login.
 *
 * IMPORTANT: kept FLAT (not nested under "user") to match the existing
 * React frontend's AuthContext, which reads data.token, data.id,
 * data.name, data.email directly from the response body.
 */
public record LoginResponse(
        String token,
        Long id,
        String name,
        String email
) {}
