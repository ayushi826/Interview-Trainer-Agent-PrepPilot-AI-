package com.preppilot.backend.entity;

/**
 * Application roles. Every new registration gets USER by default.
 * Kept as an enum (not a free-text string) so invalid roles can't sneak in.
 */
public enum Role {
    USER,
    ADMIN
}
