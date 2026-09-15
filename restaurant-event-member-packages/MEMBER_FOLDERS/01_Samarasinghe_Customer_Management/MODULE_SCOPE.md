# Module Scope — Customer Management

## In Scope

- User registration (POST /api/auth/register)
- User login and JWT issuance (POST /api/auth/login)
- Current user profile retrieval (GET /api/users/me)
- Profile update (PUT /api/users/me)
- Notification listing for authenticated user (GET /api/notifications)
- Mark notification as read (PATCH /api/notifications/{id}/read)
- Mark all notifications read (PATCH /api/notifications/read-all)
- Admin: list all users (GET /api/admin/users)
- Admin: toggle user active status (PATCH /api/admin/users/{id}/toggle-active)
- Admin: system reports (GET /api/reports/*)

## Out of Scope

- Reservations (Module 04)
- Food orders (Module 03)
- Events (Module 02)
- Inventory (Module 05)
- Staff (Module 06)
- Payment processing (Module 02)

## Boundary Interfaces

- NotificationService is called by ALL other modules when they need to create a notification.
- UserRepository is read by security to load user details for JWT validation.
- The DataSeeder in config/ seeds roles and a default ADMIN user on startup.

## Files You Own

```
src/main/java/com/group06/restaurantevent/auth/
src/main/java/com/group06/restaurantevent/users/
src/main/java/com/group06/restaurantevent/notifications/
src/main/java/com/group06/restaurantevent/reports/
src/main/resources/application.properties  (shared — do not break other module config)
```
