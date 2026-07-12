package com.preppilot.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Simple health check endpoint.
 * Lets us confirm the Spring Boot app started correctly before we build
 * real features on top of it.
 *
 * Test with: GET http://localhost:8080/api/health
 */
@RestController
public class HealthController {

    @GetMapping("/api/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "service", "PrepPilot AI backend"
        ));
    }
}
