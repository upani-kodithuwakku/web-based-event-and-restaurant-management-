# Manual Test Cases — Customer Management

## TC-AUTH-01: Successful Registration
Steps: POST /api/auth/register with valid unique email and strong password.
Expected: 201 Created with JWT token, roles: [CUSTOMER].

## TC-AUTH-02: Duplicate Email
Steps: POST /api/auth/register with an email already in the database.
Expected: 409 Conflict, error message contains "already registered".

## TC-AUTH-03: Missing Required Fields
Steps: POST /api/auth/register with missing fullName.
Expected: 400 Bad Request with field validation error.

## TC-AUTH-04: Successful Login
Steps: POST /api/auth/login with correct credentials.
Expected: 200 OK with valid JWT token.

## TC-AUTH-05: Wrong Password
Steps: POST /api/auth/login with wrong password.
Expected: 401 Unauthorized.

## TC-AUTH-06: Login Inactive User
Steps: Set is_active=FALSE in DB. Attempt login.
Expected: 401 Unauthorized.

## TC-USER-01: Get Own Profile
Steps: GET /api/users/me with valid JWT.
Expected: 200 OK with user's own data.

## TC-USER-02: Unauthenticated Access
Steps: GET /api/users/me without Authorization header.
Expected: 401 Unauthorized.

## TC-USER-03: Customer Cannot Access Admin Endpoint
Steps: GET /api/admin/users with CUSTOMER JWT.
Expected: 403 Forbidden.

## TC-NOTIF-01: Receive Notification
Steps: Create a reservation (triggers notification creation). GET /api/notifications.
Expected: Notification with type RESERVATION appears in list.

## TC-NOTIF-02: Mark Notification Read
Steps: PATCH /api/notifications/{id}/read.
Expected: is_read becomes true. Unread count decreases.

## TC-NOTIF-03: Mark Other User's Notification
Steps: Use user A's token to mark user B's notification as read.
Expected: 403 Forbidden or 404 Not Found.
