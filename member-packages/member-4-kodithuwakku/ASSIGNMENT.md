# Member 4 — Your Assignment
## Kodithuwakku U.A.A.
**Module: Table Reservation Management (PRIMARY MODULE)**
**Branch: `feature/table-reservations`**

---

> This is the team's PRIMARY assigned module. The backend is already implemented.
> Your job: complete, harden, test, and connect the frontend properly.

---

## Your Git Setup

```bash
git clone <your-team-repo-url>
cd web-based-event-and-restaurant-management-
git checkout develop && git pull origin develop
git checkout -b feature/table-reservations
```

---

## Run the Project

```bash
# Terminal 1 — Backend (your module is already working)
cd restaurant-event-backend
cp .env.example .env   # fill in your MySQL password
mvn spring-boot:run

# Terminal 2 — Frontend
cd restaurant-event-frontend && npm install && npm run dev
```
Frontend: http://localhost:5173

---

## Your Backend Files (ALREADY IMPLEMENTED — review, harden, test)

```
restaurant-event-backend/src/main/java/com/group06/restaurantevent/reservations/
├── entity/
│   ├── RestaurantTable.java       ← review all fields
│   └── TableReservation.java      ← review all fields and status enum
├── dto/
│   ├── request/
│   │   ├── CreateReservationRequest.java   ← validation annotations
│   │   ├── UpdateReservationRequest.java
│   │   ├── CancelReservationRequest.java
│   │   ├── CreateTableRequest.java
│   │   └── UpdateTableStatusRequest.java
│   └── response/
│       ├── ReservationResponse.java
│       ├── TableResponse.java
│       └── AvailabilityResponse.java
├── repository/
│   ├── RestaurantTableRepository.java     ← check overlap query
│   └── TableReservationRepository.java
└── service/
    ├── ReservationService.java    ← business logic
    └── TableService.java          ← table CRUD + status
```

### What to VERIFY in existing code

1. Overlap detection query is correct (check `TableReservationRepository`).
2. `@Transactional` is present on reservation-create and check-in methods.
3. `bookingReference` is unique — format: `RES-YYYYMMDD-XXXX`.
4. Status transitions are enforced (no jumping from CANCELLED to CHECKED_IN).
5. Notification is created when reservation is confirmed.
6. Audit log is created when staff changes table status.

### What to ADD

- `TableReservation` — add `seatingPreference` field if missing.
- `ReservationService` — add `suggestAlternativeTimes()` method.
- `AdminReservationController` — `/api/admin/reservations/{id}/no-show` endpoint.

---

## Your Frontend Files (COMPLETE — your responsibility)

```
frontend/src/pages/Reservations.tsx          ← Customer reservation list
frontend/src/pages/admin/AdminReservations.tsx ← Staff calendar + check-in/complete/no-show
frontend/src/pages/admin/Tables.tsx          ← Admin table CRUD + status panel
frontend/src/components/BookingModal.tsx     ← Reservation booking form
```

### Frontend to IMPROVE

- Wire `AdminReservations.tsx` fully to the real API (currently has demo-mode logic).
- Add a "no-show" button that hits `PATCH /api/admin/reservations/{id}/no-show`.
- Add seating preference filter to the availability search.
- Show alternative times when no table is available.

---

## Reservation Rules (you must enforce ALL of these)

1. Reservation date/time cannot be in the past.
2. `guestCount` must be ≥ 1.
3. Table capacity must be ≥ `guestCount`.
4. `OUT_OF_SERVICE` tables cannot be reserved.
5. No overlapping active reservations for the same table (window = 120 minutes).
6. Active statuses: `PENDING`, `CONFIRMED`, `CHECKED_IN`.
7. Non-blocking: `CANCELLED`, `COMPLETED`, `NO_SHOW`.
8. Customer can view/edit/cancel only their OWN reservations (403 otherwise).
9. Check-in → reservation becomes `CHECKED_IN`, table becomes `OCCUPIED`.
10. Complete/no-show → reservation done, table becomes `AVAILABLE`.

---

## Endpoints (already exist — verify they all work)

```
GET    /api/reservations/availability?date=&time=&guests=&preference=
POST   /api/reservations
GET    /api/reservations/my
GET    /api/reservations/{id}
PUT    /api/reservations/{id}
PATCH  /api/reservations/{id}/cancel

GET    /api/admin/reservations?date=
PATCH  /api/admin/reservations/{id}/check-in
PATCH  /api/admin/reservations/{id}/complete
PATCH  /api/admin/reservations/{id}/no-show

GET    /api/admin/tables
POST   /api/admin/tables
PUT    /api/admin/tables/{id}
PATCH  /api/admin/tables/{id}/status
DELETE /api/admin/tables/{id}
```

---

## Tests You MUST Write

Location: `src/test/java/com/group06/restaurantevent/reservations/`

```java
// 1. Past date/time → 400
// 2. guestCount = 0 → 400
// 3. Same table, overlapping time → 409 Conflict
// 4. OUT_OF_SERVICE table → 409
// 5. CANCELLED reservation releases slot (second booking succeeds)
// 6. Customer A cannot cancel Customer B's reservation → 403
// 7. Check-in: reservation = CHECKED_IN, table = OCCUPIED (both in one transaction)
// 8. Complete: reservation = COMPLETED, table = AVAILABLE
// 9. No-show: reservation = NO_SHOW, table = AVAILABLE
// 10. bookingReference is unique across all reservations
```

---

## Commit Messages

```
feat(reservations): add no-show endpoint
feat(reservations): add seating preference to search
feat(reservations): add alternative time suggestions
test(reservations): cover overlap conflict scenario
test(reservations): check-in transaction test
fix(reservations): correct overlap time window calculation
```

---

## Pull Request Checklist

- [ ] All 10 test cases pass
- [ ] `mvn test` passes completely
- [ ] `npm run build` passes
- [ ] Admin check-in/complete/no-show tested via Swagger
- [ ] Overlap query tested with real MySQL data
- [ ] Seating preference filter works
- [ ] No `.env` committed
- [ ] You can explain the overlap query SQL

---

## Files in This Package

```
backend-module/reservations/       ← EXISTING complete code — review carefully
frontend-files/Reservations.tsx    ← Customer reservation list
frontend-files/AdminReservations.tsx ← Staff calendar panel
frontend-files/Tables.tsx          ← Admin table management
frontend-files/BookingModal.tsx    ← Booking form
```

*Group 06 · SLIIT 2026*
