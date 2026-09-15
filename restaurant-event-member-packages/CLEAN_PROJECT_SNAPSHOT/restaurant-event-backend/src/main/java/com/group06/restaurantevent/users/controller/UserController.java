package com.group06.restaurantevent.users.controller;

import com.group06.restaurantevent.users.entity.Role;
import com.group06.restaurantevent.users.entity.User;
import com.group06.restaurantevent.users.repository.UserRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getProfile(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(Map.of(
                "id", user.getId(),
                "fullName", user.getFullName(),
                "email", user.getEmail(),
                "phone", user.getPhone() != null ? user.getPhone() : "",
                "roles", user.getRoles().stream().map(Role::getName).toList()
        ));
    }

    @PutMapping("/me")
    public ResponseEntity<Map<String, Object>> updateProfile(@AuthenticationPrincipal User user,
                                                             @RequestBody UpdateProfileRequest req) {
        user.setFullName(req.getFullName());
        if (req.getPhone() != null) user.setPhone(req.getPhone());
        userRepository.save(user);
        return ResponseEntity.ok(Map.of(
                "id", user.getId(),
                "fullName", user.getFullName(),
                "email", user.getEmail(),
                "phone", user.getPhone() != null ? user.getPhone() : ""
        ));
    }

    @Data
    public static class UpdateProfileRequest {
        private String fullName;
        private String phone;
    }
}
