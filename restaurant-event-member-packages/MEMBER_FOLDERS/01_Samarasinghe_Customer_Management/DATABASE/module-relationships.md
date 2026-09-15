# Relationships — Customer Management

- User -> UserRole -> Role: Many-to-many. A user may have multiple roles (e.g., ADMIN + MANAGER). DataSeeder seeds 8 roles on startup.
- User -> Notification: One-to-many. Every notification belongs to exactly one user.
- User -> PasswordResetToken: One-to-many. A user can have multiple reset tokens but only the latest unused one is valid.
- User is referenced as a foreign key by: table_reservations.customer_id, food_orders.customer_id, event_bookings.customer_id, feedback.customer_id, audit_logs.user_id, staff_profiles.user_id.
