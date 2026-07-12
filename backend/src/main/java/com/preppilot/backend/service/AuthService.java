package com.preppilot.backend.service;

import com.preppilot.backend.dto.*;
import com.preppilot.backend.entity.Role;
import com.preppilot.backend.entity.User;
import com.preppilot.backend.exception.DuplicateEmailException;
import com.preppilot.backend.exception.ResourceNotFoundException;
import com.preppilot.backend.repository.UserRepository;
import com.preppilot.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * All the business logic for authentication: registering new users,
 * logging existing ones in, and fetching the currently logged-in user.
 * Controllers stay thin and just delegate here.
 */
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Transactional
    public RegisterResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new DuplicateEmailException("An account with this email already exists");
        }

        User user = User.builder()
                .name(request.name())
                .email(request.email())
                .password(passwordEncoder.encode(request.password())) // never store plain text
                .role(Role.USER)
                .build();

        userRepository.save(user);

        return new RegisterResponse("Registration successful");
    }

    public LoginResponse login(LoginRequest request) {
        // Delegates to Spring Security's AuthenticationManager, which uses
        // CustomUserDetailsService + PasswordEncoder under the hood.
        // Throws BadCredentialsException (-> 401) if email/password don't match.
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String token = jwtService.generateToken(userDetails);

        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return new LoginResponse(token, user.getId(), user.getName(), user.getEmail());
    }

    public UserResponse getCurrentUser() {
        // The JwtAuthFilter already put a UserDetails object (username = email)
        // into the SecurityContext for this request.
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return new UserResponse(user.getId(), user.getName(), user.getEmail(), user.getRole().name());
    }
}
