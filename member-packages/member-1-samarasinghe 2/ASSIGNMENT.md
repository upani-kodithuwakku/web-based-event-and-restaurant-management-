# Member 1 — Your Assignment
## Samarasinghe M.H.D.
**Module: Customer Management, Notifications & Reports**
**Branch: `feature/customer-management`**

---

## Your Git Setup (do this first)

```bash
# 1. Clone the shared repo
git clone <your-team-repo-url>
cd web-based-event-and-restaurant-management-

# 2. Go to develop and pull latest
git checkout develop
git pull origin develop

# 3. Create your feature branch
git checkout -b feature/customer-management
```

---

## Run the Project Locally

### Backend
```bash
cd restaurant-event-backend
cp .env.example .env      # then fill in your MySQL password
mvn spring-boot:run
```
Backend runs at: http://localhost:8080
Swagger docs: http://localhost:8080/swagger-ui.html

### Frontend
```bash
cd restaurant-event-frontend
npm install
npm run dev
```
Frontend runs at: http://localhost:5173

---

## Your Backend Files (already exist — improve and complete them)

```
restaurant-event-backend/src/main/java/com/group06/restaurantevent/
├── auth/              ← Login, Register, JWT — READ and understand this
├── users/             ← User CRUD, profile — IMPROVE this
├── notifications/     ← Notification entity/service — ADD content here
└── reports/           ← Dashboard summaries — ADD content here
```

### What to ADD in `notifications/` (currently empty skeleton)

Create these files:

```
notifications/
├── entity/
│   └── Notification.java          ← id, userId, title, message, type, isRead, createdAt
├── dto/
│   ├── request/
│   │   └── CreateNotificationRequest.java
│   └── response/
│       └── NotificationResponse.java
├── repository/
│   └── NotificationRepository.java
├── service/
│   └── NotificationService.java   ← create(), markRead(), listForUser()
├── controller/
│   └── NotificationController.java
└── mapper/
    └── NotificationMapper.java
```

### What to ADD in `reports/` (currently empty skeleton)

Create:
```
reports/
├── dto/response/
│   └── DashboardSummaryResponse.java   ← today's reservations, occupied tables, revenue, etc.
├── service/
│   └── ReportService.java
└── controller/
    └── ReportController.java
```

---

## Your Endpoints to Implement

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/forgot-password   (simulate — return 200, no real email)
POST   /api/auth/reset-password    (simulate)

GET    /api/users/me
PUT    /api/users/me

GET    /api/admin/users
PATCH  /api/admin/users/{id}/status

GET    /api/notifications
PATCH  /api/notifications/{id}/read
DELETE /api/notifications (clear all for current user)

GET    /api/admin/reports/dashboard
GET    /api/admin/reports/reservations?date=...
```

---

## Your Frontend Files (already exist — understand and improve)

```
frontend/src/pages/Auth.tsx     ← Login + Register forms
frontend/src/pages/Profile.tsx  ← Customer profile
```

### Frontend pages YOU need to add

- `src/pages/admin/Customers.tsx` — admin list of all customers with status toggle
- A notification panel (currently basic in Layout.tsx — make it richer)

---

## Tests You Must Write

Location: `restaurant-event-backend/src/test/java/com/group06/restaurantevent/auth/`

```java
// 1. Duplicate email is rejected (409 Conflict)
// 2. Missing required fields return 400
// 3. Wrong password returns 401
// 4. Valid login returns JWT
// 5. Customer cannot access /api/admin/users (403)
// 6. Mark notification as read works
```

---

## Commit Message Convention

```
feat(auth): add password reset simulation
feat(notifications): add mark-as-read endpoint
feat(reports): add admin dashboard summary
test(auth): reject duplicate email registration
fix(users): return 404 when user not found
```

---

## Pull Request Checklist

Before opening a PR to `develop`:

- [ ] `mvn test` passes
- [ ] `npm run build` passes
- [ ] Tested in Swagger
- [ ] No `.env` committed
- [ ] DTOs used (no raw entities in controllers)
- [ ] JWT protection on all private endpoints
- [ ] You can explain every class you wrote

---

## Files Included in This Package

```
backend-module/auth/         ← Existing auth code to review
backend-module/users/        ← Existing user code to improve
backend-module/notifications/ ← Empty — YOU implement this
backend-module/reports/       ← Empty — YOU implement this
frontend-files/Auth.tsx       ← Existing login/register page
frontend-files/Profile.tsx    ← Existing profile page
```

*Group 06 · SLIIT 2026*
