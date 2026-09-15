package com.group06.restaurantevent.users.controller;

import com.group06.restaurantevent.common.exception.BadRequestException;
import com.group06.restaurantevent.common.exception.ResourceNotFoundException;
import com.group06.restaurantevent.users.entity.Role;
import com.group06.restaurantevent.users.entity.User;
import com.group06.restaurantevent.users.repository.UserRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
public class AdminUserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> listUsers() {
        List<Map<String, Object>> users = userRepository.findAll().stream()
                .map(this::toMap)
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(toMap(findUser(id)));
    }

    @PatchMapping("/{id}/suspend")
    public ResponseEntity<Map<String, Object>> toggleSuspend(
            @PathVariable Long id,
            @RequestBody Map<String, Boolean> body) {
        User user = findUser(id);
        boolean active = Boolean.TRUE.equals(body.get("active"));
        user.setActive(active);
        userRepository.save(user);
        return ResponseEntity.ok(toMap(user));
    }

    @PostMapping("/{id}/reset-password")
    public ResponseEntity<Void> resetPassword(
            @PathVariable Long id,
            @RequestBody ResetPasswordRequest req) {
        if (req.getPassword() == null || req.getPassword().length() < 8)
            throw new BadRequestException("Password must be at least 8 characters");
        User user = findUser(id);
        user.setPasswordHash(passwordEncoder.encode(req.getPassword()));
        userRepository.save(user);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deactivateUser(@PathVariable Long id) {
        User user = findUser(id);
        user.setActive(false);
        userRepository.save(user);
        return ResponseEntity.noContent().build();
    }

    private User findUser(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + id));
    }

    private Map<String, Object> toMap(User u) {
        Set<String> roles = u.getRoles().stream().map(Role::getName).collect(Collectors.toSet());
        return Map.of(
                "id",       u.getId(),
                "fullName", u.getFullName() != null ? u.getFullName() : "",
                "email",    u.getEmail(),
                "phone",    u.getPhone() != null ? u.getPhone() : "",
                "roles",    roles,
                "isActive", u.isActive()
        );
    }

    @Data
    public static class ResetPasswordRequest {
        private String password;
    }
}
