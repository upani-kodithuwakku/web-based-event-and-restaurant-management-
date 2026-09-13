package com.group06.restaurantevent.config;

import com.group06.restaurantevent.users.entity.Role;
import com.group06.restaurantevent.users.entity.User;
import com.group06.restaurantevent.users.repository.RoleRepository;
import com.group06.restaurantevent.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) {
        seedRoles();
        seedAdminUser();
    }

    private void seedRoles() {
        List<String[]> roles = List.of(
                new String[]{"CUSTOMER",           "Restaurant customer"},
                new String[]{"ADMIN",              "System administrator"},
                new String[]{"MANAGER",            "Restaurant manager"},
                new String[]{"WAITER",             "Floor staff - waiter"},
                new String[]{"KITCHEN_STAFF",      "Kitchen preparation staff"},
                new String[]{"EVENT_COORDINATOR",  "Event bookings coordinator"},
                new String[]{"CASHIER",            "Billing and payments staff"},
                new String[]{"INVENTORY_MANAGER",  "Inventory and supplier management"}
        );

        for (String[] r : roles) {
            if (roleRepository.findByName(r[0]).isEmpty()) {
                Role role = new Role();
                role.setName(r[0]);
                role.setDescription(r[1]);
                roleRepository.save(role);
                log.info("Seeded role: {}", r[0]);
            }
        }
    }

    private void seedAdminUser() {
        if (userRepository.existsByEmail("admin@restaurant.com")) return;

        Role adminRole = roleRepository.findByName("ADMIN").orElseThrow();
        User admin = User.builder()
                .fullName("System Admin")
                .email("admin@restaurant.com")
                .phone("0711000000")
                .passwordHash(passwordEncoder.encode("Admin@123"))
                .isActive(true)
                .roles(Set.of(adminRole))
                .build();
        userRepository.save(admin);
        log.info("Seeded admin user: admin@restaurant.com / Admin@123");
    }
}
