# Frontend Test Map — Customer Management

## Auth.tsx
- Renders login form by default
- Switches to register tab on click
- Submit with empty fields shows validation errors
- Successful login stores token and redirects

## Profile.tsx
- Renders current user data on load
- Edit mode toggles on button click
- Save sends PUT /api/users/me
- Cancel reverts form to original values

## AppContext.tsx
- Token saved to localStorage on login
- Token cleared from localStorage on logout
- Protected routes redirect to /login when unauthenticated
- getMe called on app load to restore session

## Manual test via browser
1. Open http://localhost:5173
2. Register a new account — verify redirect to dashboard
3. Log out — verify token cleared
4. Log in again — verify session restored
5. Open Profile — verify data matches what was registered
6. Edit phone number — verify save works without page reload
