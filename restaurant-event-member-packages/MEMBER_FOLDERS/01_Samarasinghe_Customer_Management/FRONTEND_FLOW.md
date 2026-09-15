# Frontend Flow — Customer Management

## Auth Flow (pages/Auth.tsx)

1. User visits `/login` or `/register`.
2. Auth.tsx renders a tab-based form (Login / Register).
3. On submit, calls `authApi.login()` or `authApi.register()` from services/api.ts.
4. On success, `AppContext.setUser()` stores the user object and JWT token.
5. Token is stored in localStorage under the key `token`.
6. User is redirected to `/dashboard` (CUSTOMER) or `/admin/dashboard` (staff/admin).

## Profile Flow (pages/Profile.tsx)

1. Profile page calls `userApi.getMe()` on mount.
2. Displays full name, email, phone, and role list.
3. Edit mode allows updating fullName and phone (email is not editable).
4. On save, calls `userApi.updateMe()` with the changed fields.

## Customer Dashboard (pages/CustomerDashboard.tsx)

1. Fetches recent reservations, orders, notifications via respective API calls.
2. Shows unread notification count badge.
3. Provides quick links to Reservations, Menu, Events pages.

## Notification Flow

- CustomerDashboard polls or fetches notifications from `notificationApi.getMyNotifications()`.
- Mark as read triggers `notificationApi.markRead(id)`.
- Mark all read triggers `notificationApi.markAllRead()`.

## Global Auth State (context/AppContext.tsx)

- Stores `user`, `token`, `isAuthenticated`.
- Provides `login()`, `logout()`, `setUser()` functions.
- On app load, reads token from localStorage and validates by calling `/api/users/me`.
- Protected routes check `isAuthenticated` before rendering.

## API Calls (services/api.ts — auth/user/notification sections)

```typescript
authApi.register(data)     // POST /api/auth/register
authApi.login(data)        // POST /api/auth/login
userApi.getMe()            // GET  /api/users/me
userApi.updateMe(data)     // PUT  /api/users/me
notificationApi.getAll()   // GET  /api/notifications
notificationApi.markRead(id)   // PATCH /api/notifications/{id}/read
notificationApi.markAllRead()  // PATCH /api/notifications/read-all
```
