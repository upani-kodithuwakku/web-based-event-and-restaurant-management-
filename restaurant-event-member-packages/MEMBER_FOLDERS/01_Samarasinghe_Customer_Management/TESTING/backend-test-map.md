# Backend Test Map — Customer Management

## Test Class: AuthServiceTest

| Test Method | Scenario | Expected |
|-------------|----------|----------|
| registerSuccess | Valid new user | User saved, JWT returned |
| registerDuplicateEmail | Email already exists | 409 ResourceConflictException |
| loginSuccess | Correct credentials | JWT returned |
| loginWrongPassword | Wrong password | 401 BadCredentialsException |
| loginInactiveUser | is_active = false | 401 exception |

## Test Class: UserServiceTest

| Test Method | Scenario | Expected |
|-------------|----------|----------|
| getMeSuccess | Authenticated user | UserResponse returned |
| updateMeSuccess | Valid update | Updated UserResponse |
| updateMeEmailNotChanged | Try to change email | Email field ignored |

## Test Class: NotificationServiceTest

| Test Method | Scenario | Expected |
|-------------|----------|----------|
| createNotification | Valid data | Notification saved |
| markReadSuccess | Owned notification | is_read = true |
| markReadWrongUser | Other user's notification | 403 |
| getUnreadCount | 3 unread | Returns 3 |

## Test Location

```
restaurant-event-backend/src/test/java/com/group06/restaurantevent/
├── auth/AuthServiceTest.java
├── users/UserServiceTest.java
└── notifications/NotificationServiceTest.java
```

## Run Tests

```bash
cd restaurant-event-backend
./mvnw test -Dtest="AuthServiceTest,UserServiceTest,NotificationServiceTest"
```
