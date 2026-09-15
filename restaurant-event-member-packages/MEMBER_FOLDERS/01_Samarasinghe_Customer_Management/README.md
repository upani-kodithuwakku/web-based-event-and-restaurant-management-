# Member 01 — Customer Management Module

**Member:** Samarasinghe M.H.D.
**Module:** Customer Management (Authentication, Users, Notifications, Reports)
**Roles:** CUSTOMER, ADMIN, MANAGER

## Module Summary

This module owns the complete user lifecycle:

- User registration and login (JWT-based)
- Role-based access control (CUSTOMER, ADMIN, MANAGER, and all other roles)
- Profile view and update
- Password management (BCrypt hashing; simulated reset flow)
- In-app notification delivery and read tracking
- Admin user management (list, activate/deactivate)
- System-level reports (daily sales, reservations, events, inventory low-stock)

## Backend Modules

```
auth/       — registration, login, JWT issuance, token refresh
users/      — User entity, UserRole, profile endpoints, admin user management
notifications/ — Notification entity, factory pattern, mark-read endpoint
reports/    — Admin-only report aggregation endpoints
```

## Frontend Files

```
pages/Auth.tsx              — Login and register forms
pages/Profile.tsx           — Customer profile view and edit
pages/CustomerDashboard.tsx — Customer home: recent activity, notifications
pages/shared/NotFound.tsx   — 404 page
context/AppContext.tsx      — Global auth state, current user, token storage
services/api.ts             — authApi, userApi, notificationApi functions
```

## Design Patterns Implemented

- **Factory Pattern** — `NotificationFactory` creates typed notifications (RESERVATION, ORDER, EVENT, PAYMENT, LOW_STOCK) without the caller knowing the construction details.

## Key Business Rules

1. Passwords are hashed using BCrypt before storage.
2. JWT tokens expire after 24 hours (86400000 ms).
3. Email must be unique across all users.
4. A deactivated user (`is_active = false`) cannot log in.
5. Customers can only see their own profile and notifications.
6. Admin can list and toggle active status of any user.
7. All role-seeding happens in `DataSeeder` on application startup.
