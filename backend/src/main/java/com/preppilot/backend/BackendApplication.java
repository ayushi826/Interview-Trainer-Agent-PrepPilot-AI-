package com.preppilot.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Entry point for the PrepPilot AI backend.
 * Running this class starts the embedded Tomcat server and boots the whole
 * Spring context (controllers, services, repositories, security, etc.).
 */
@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }
}
