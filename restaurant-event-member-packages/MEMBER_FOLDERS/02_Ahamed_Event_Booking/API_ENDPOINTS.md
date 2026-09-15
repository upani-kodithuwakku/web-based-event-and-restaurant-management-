# API Endpoints — Event Booking

Base URL: http://localhost:8080/api

## Public / Customer Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | /api/events/halls | Any | List active halls |
| GET | /api/events/packages | Any | List active packages |
| GET | /api/events/availability | Any | Check hall availability |
| POST | /api/events/bookings | CUSTOMER | Create booking request |
| GET | /api/events/bookings/my | CUSTOMER | Customer's bookings |
| GET | /api/events/bookings/{id} | CUSTOMER | Booking detail |

## Event Coordinator Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | /api/event-coordinator/bookings | COORDINATOR/ADMIN | All bookings |
| GET | /api/event-coordinator/calendar | COORDINATOR/ADMIN | Event calendar |
| PATCH | /api/event-coordinator/bookings/{id}/approve | COORDINATOR/ADMIN | Approve booking |
| PATCH | /api/event-coordinator/bookings/{id}/reject | COORDINATOR/ADMIN | Reject with reason |

## Admin Hall and Package Management

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /api/admin/halls | ADMIN/MANAGER | Create hall |
| GET | /api/admin/halls | ADMIN/MANAGER | List halls |
| PUT | /api/admin/halls/{id} | ADMIN/MANAGER | Update hall |
| DELETE | /api/admin/halls/{id} | ADMIN/MANAGER | Deactivate hall |
| POST | /api/admin/packages | ADMIN/MANAGER | Create package |
| GET | /api/admin/packages | ADMIN/MANAGER | List packages |
| PUT | /api/admin/packages/{id} | ADMIN/MANAGER | Update package |
| DELETE | /api/admin/packages/{id} | ADMIN/MANAGER | Deactivate package |

## Billing Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /api/billing/invoices | CASHIER/ADMIN | Create invoice |
| GET | /api/billing/invoices/{id} | Auth | Get invoice |
| GET | /api/billing/invoices/my | CUSTOMER | Customer invoices |
| POST | /api/billing/payments | CASHIER | Record payment |
| GET | /api/billing/payments/{id} | Auth | Payment detail |

## Sample Booking Request

```json
{
  "hallId": 1,
  "packageId": 2,
  "eventDate": "2026-12-25",
  "startTime": "18:00",
  "endTime": "23:00",
  "guestCount": 150,
  "specialRequirements": "Vegetarian menu preferred"
}
```

## Sample Rejection Request

```json
{
  "rejectionReason": "Hall not available for that time slot due to maintenance"
}
```
