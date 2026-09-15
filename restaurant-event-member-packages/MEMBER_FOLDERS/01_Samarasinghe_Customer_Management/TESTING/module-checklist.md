# Module Completion Checklist — Customer Management

## Backend
- [ ] User entity compiles with all fields
- [ ] Role entity and UserRole join table work
- [ ] BCrypt password hashing applied on register
- [ ] JWT token issued on login
- [ ] JWT token validated on every protected endpoint
- [ ] Duplicate email returns 409
- [ ] Wrong password returns 401
- [ ] Inactive user login returns 401
- [ ] GET /api/users/me returns current user
- [ ] PUT /api/users/me updates name/phone
- [ ] Notification entity and repository work
- [ ] NotificationFactory creates all 5 notification types
- [ ] GET /api/notifications returns user's own only
- [ ] PATCH /api/notifications/{id}/read works
- [ ] Report endpoints return aggregated data
- [ ] Global exception handler returns standard error JSON
- [ ] Swagger documents all endpoints

## Frontend
- [ ] Login form submits and stores token
- [ ] Register form validates required fields
- [ ] AppContext persists session on page refresh
- [ ] Profile page loads and updates correctly
- [ ] CustomerDashboard shows notifications
- [ ] Protected routes redirect unauthenticated users
- [ ] Logout clears token and redirects to login

## Tests
- [ ] AuthServiceTest passes (register, login, errors)
- [ ] UserServiceTest passes
- [ ] NotificationServiceTest passes

## Database
- [ ] users table created by Hibernate ddl-auto
- [ ] roles table seeded (8 roles)
- [ ] admin user seeded by DataSeeder
- [ ] notifications table created
- [ ] No secrets committed to Git
