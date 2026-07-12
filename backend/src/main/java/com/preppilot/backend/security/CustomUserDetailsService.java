package com.preppilot.backend.security;

import com.preppilot.backend.entity.User;
import com.preppilot.backend.repository.UserRepository;
import com.preppilot.backend.util.AuthConstants;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Tells Spring Security how to load a user for authentication.
 * We use the user's EMAIL as their "username" throughout.
 */
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("No user found with email: " + email));

        List<GrantedAuthority> authorities = List.of(
                new SimpleGrantedAuthority(AuthConstants.ROLE_PREFIX + user.getRole().name())
        );

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .authorities(authorities)
                .build();
    }
}
