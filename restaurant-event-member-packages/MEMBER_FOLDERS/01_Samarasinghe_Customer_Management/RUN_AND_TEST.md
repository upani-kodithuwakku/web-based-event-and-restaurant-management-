# Run and Test — Customer Management

## Prerequisites

- Java 21, Maven, MySQL 8 running, database `restaurant_event_db` created
- `.env` file in `restaurant-event-backend/` with correct credentials
- Node.js 20+, npm

## Run Backend

```bash
cd restaurant-event-backend
./mvnw spring-boot:run
```

Health check: GET http://localhost:8080/api/health

Swagger: http://localhost:8080/swagger-ui/index.html

## Run Frontend

```bash
cd restaurant-event-frontend
npm install
npm run dev
```

Visit http://localhost:5173

## Run Backend Unit Tests

```bash
cd restaurant-event-backend
./mvnw test
```

To run only auth/user/notification tests:

```bash
./mvnw test -Dtest="AuthServiceTest,UserServiceTest,NotificationServiceTest"
```

## Manual Test Scenarios

### Register a new user
```
POST http://localhost:8080/api/auth/register
Content-Type: application/json

{
  "fullName": "Test User",
  "email": "test@example.com",
  "phone": "0771234567",
  "password": "Password123"
}
```
Expected: 201 with JWT token.

### Login
```
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "Password123"
}
```
Expected: 200 with JWT token.

### Duplicate email
Repeat the register request above.
Expected: 409 Conflict, message: "Email is already registered".

### Get profile
```
GET http://localhost:8080/api/users/me
Authorization: Bearer <token>
```
Expected: 200 with user details.

### Wrong password
```
POST http://localhost:8080/api/auth/login
{ "email": "test@example.com", "password": "wrong" }
```
Expected: 401 Unauthorized.

### Access admin endpoint as CUSTOMER
```
GET http://localhost:8080/api/admin/users
Authorization: Bearer <customer_token>
```
Expected: 403 Forbidden.
