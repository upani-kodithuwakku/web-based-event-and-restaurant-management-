# API Endpoints — Customer Management

Base URL: http://localhost:8080/api

## Auth Endpoints (public)

| Method | Path | Description | Request Body | Response |
|--------|------|-------------|--------------|----------|
| POST | /api/auth/register | Register a new user | RegisterRequest | 201 AuthResponse |
| POST | /api/auth/login | Login and receive JWT | LoginRequest | 200 AuthResponse |

### RegisterRequest
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "0771234567",
  "password": "SecurePass123"
}
```

### LoginRequest
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

### AuthResponse
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "type": "Bearer",
  "id": 1,
  "email": "john@example.com",
  "fullName": "John Doe",
  "roles": ["CUSTOMER"]
}
```

## User Endpoints (requires JWT)

| Method | Path | Role | Description |
|--------|------|------|-------------|
| GET | /api/users/me | Any | Get current user profile |
| PUT | /api/users/me | Any | Update profile (name, phone) |

## Notification Endpoints (requires JWT)

| Method | Path | Role | Description |
|--------|------|------|-------------|
| GET | /api/notifications | Any | List user's notifications |
| PATCH | /api/notifications/{id}/read | Any | Mark one notification read |
| PATCH | /api/notifications/read-all | Any | Mark all notifications read |
| GET | /api/notifications/unread-count | Any | Count unread notifications |

## Admin User Endpoints (ADMIN or MANAGER)

| Method | Path | Role | Description |
|--------|------|------|-------------|
| GET | /api/admin/users | ADMIN/MANAGER | List all users |
| GET | /api/admin/users/{id} | ADMIN/MANAGER | Get user by id |
| PATCH | /api/admin/users/{id}/toggle-active | ADMIN | Enable or disable a user |

## Report Endpoints (ADMIN or MANAGER)

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/reports/dashboard | Summary counts for admin dashboard |
| GET | /api/reports/reservations?date=YYYY-MM-DD | Daily reservation report |
| GET | /api/reports/sales?date=YYYY-MM-DD | Daily sales report |
| GET | /api/reports/events | Event booking report |
| GET | /api/reports/inventory/low-stock | Low-stock report |

## Error Response Format

```json
{
  "timestamp": "2026-09-15T10:30:00",
  "status": 400,
  "error": "Validation failed",
  "message": "Email is already registered",
  "path": "/api/auth/register"
}
```

HTTP Status codes used:
- 200 OK, 201 Created, 204 No Content
- 400 Bad Request (validation), 401 Unauthorized, 403 Forbidden
- 404 Not Found, 409 Conflict (duplicate email)
