# API Endpoints — Table Reservations

Base URL: http://localhost:8080/api

## Table Availability (Customer)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | /api/reservations/availability | Any/Auth | Search available tables |

Query params: `date=2026-09-20&time=19:00&guests=4&preference=WINDOW`

Response includes: list of available tables, and if none found: list of alternative available times.

## Customer Reservation Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /api/reservations | CUSTOMER | Create reservation |
| GET | /api/reservations/my | CUSTOMER | Own reservations |
| GET | /api/reservations/{id} | CUSTOMER | Own reservation detail |
| PUT | /api/reservations/{id} | CUSTOMER | Modify future reservation |
| PATCH | /api/reservations/{id}/cancel | CUSTOMER | Cancel reservation |

## Admin/Staff Reservation Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | /api/admin/reservations | WAITER/ADMIN/MANAGER | Daily calendar (filter by date, status) |
| PATCH | /api/admin/reservations/{id}/check-in | WAITER/ADMIN | Check in customer |
| PATCH | /api/admin/reservations/{id}/complete | WAITER/ADMIN | Complete dining session |
| PATCH | /api/admin/reservations/{id}/no-show | WAITER/ADMIN | Mark no-show |

## Admin Table CRUD

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | /api/admin/tables | ADMIN/MANAGER | List all tables |
| POST | /api/admin/tables | ADMIN/MANAGER | Create table |
| PUT | /api/admin/tables/{id} | ADMIN/MANAGER | Update table details |
| PATCH | /api/admin/tables/{id}/status | ADMIN/MANAGER | Change table status |
| DELETE | /api/admin/tables/{id} | ADMIN/MANAGER | Deactivate table |

## Sample Reservation Request

```json
{
  "tableId": 3,
  "reservationDate": "2026-09-20",
  "startTime": "19:00",
  "guestCount": 4,
  "seatingPreference": "WINDOW",
  "specialRequest": "Birthday dinner, need extra chair",
  "contactName": "Test Customer",
  "contactPhone": "0771234567"
}
```

Response: 201 with bookingReference like `RES-20260920-A7F3`

## Sample Table Create Request

```json
{
  "tableNumber": "T01",
  "capacity": 4,
  "location": "WINDOW",
  "currentStatus": "AVAILABLE"
}
```

## Error: Overlap

```json
{
  "status": 409,
  "error": "Conflict",
  "message": "Table 3 is already reserved for that time slot"
}
```
