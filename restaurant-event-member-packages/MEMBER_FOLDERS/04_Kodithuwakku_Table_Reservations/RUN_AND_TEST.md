# Run and Test — Table Reservations

## Prerequisites
- Backend running, roles seeded, at least one ADMIN and one CUSTOMER user
- At least 8 restaurant tables seeded (DataSeeder or manual)

## Seed Tables

DataSeeder or POST /api/admin/tables:
```json
{"tableNumber": "T01", "capacity": 2, "location": "WINDOW"}
{"tableNumber": "T02", "capacity": 4, "location": "INDOOR"}
{"tableNumber": "T03", "capacity": 6, "location": "OUTDOOR"}
```

## Manual Tests

### Check Availability (Available)
```
GET /api/reservations/availability?date=2026-09-20&time=19:00&guests=4&preference=WINDOW
```
Expected: list of available tables matching criteria.

### Create Reservation
```
POST /api/reservations
Authorization: Bearer <customer_token>
{
  "tableId": 2,
  "reservationDate": "2026-09-20",
  "startTime": "19:00",
  "guestCount": 4,
  "contactName": "Test Customer",
  "contactPhone": "0771234567"
}
```
Expected: 201 with bookingReference RES-20260920-XXXX, status PENDING.

### Overlap Prevention
Create second reservation for same table, same date, overlapping times (e.g. 19:30-21:30).
Expected: 409 Conflict.

### OUT_OF_SERVICE Table
PATCH /api/admin/tables/1/status with status OUT_OF_SERVICE.
Then try to reserve table 1.
Expected: 400 or 409 cannot reserve out-of-service table.

### Past Date
POST /api/reservations with reservationDate = yesterday.
Expected: 400 Bad Request.

### Capacity Check
Try to reserve table with capacity=2 for guestCount=5.
Expected: 400 Bad Request.

### Check-In
PATCH /api/admin/reservations/1/check-in as WAITER.
Expected: reservation status -> CHECKED_IN, table status -> OCCUPIED.

### Complete Session
PATCH /api/admin/reservations/1/complete.
Expected: reservation status -> COMPLETED, table status -> AVAILABLE.

### No-Show
PATCH /api/admin/reservations/2/no-show.
Expected: reservation status -> NO_SHOW, table status -> AVAILABLE.

### Customer Cannot Access Another's Reservation
GET /api/reservations/{id} with another customer's JWT.
Expected: 403 or 404.

## Run Tests
```bash
./mvnw test -Dtest="ReservationServiceTest,TableServiceTest"
```
