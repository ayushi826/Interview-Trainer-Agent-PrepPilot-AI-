package com.preppilot.backend.dto;

/**
 * Response for POST /api/auth/register.
 * Deliberately just a message - registration does NOT log the user in
 * (no token here). The frontend should send them to /login next.
 */
public record RegisterResponse(String message) {}
