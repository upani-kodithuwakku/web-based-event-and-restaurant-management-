# Manual Test Cases — Table Reservations

## TC-TBL-01: Create Table (Admin)
POST /api/admin/tables with valid data. Expected: 201.

## TC-TBL-02: Duplicate Table Number
POST /api/admin/tables with same tableNumber. Expected: 409 Conflict.

## TC-RES-01: Check Availability (Available)
GET /api/reservations/availability?date=2026-09-20&time=19:00&guests=4. Expected: list of tables.

## TC-RES-02: Check Availability (All Blocked)
Book all tables for 19:00-21:00 then check. Expected: empty list + alternative times.

## TC-RES-03: Create Reservation
POST /api/reservations with valid future date. Expected: 201, bookingReference generated.

## TC-RES-04: Overlap Prevention
Create second reservation for same table, overlapping times. Expected: 409 Conflict.

## TC-RES-05: Past Date
POST /api/reservations with past date. Expected: 400 Bad Request.

## TC-RES-06: Capacity Exceeded
Reserve table with capacity 2 for guestCount 5. Expected: 400 Bad Request.

## TC-RES-07: OUT_OF_SERVICE Table
Set table to OUT_OF_SERVICE. Try to reserve. Expected: 400/409.

## TC-RES-08: Customer Isolation
Get another customer's reservation with your JWT. Expected: 403/404.

## TC-RES-09: Check-In
PATCH /api/admin/reservations/{id}/check-in as WAITER. Expected: CHECKED_IN, table OCCUPIED.

## TC-RES-10: Complete
PATCH /api/admin/reservations/{id}/complete. Expected: COMPLETED, table AVAILABLE.

## TC-RES-11: No-Show
PATCH /api/admin/reservations/{id}/no-show. Expected: NO_SHOW, table AVAILABLE.

## TC-RES-12: Cancel
PATCH /api/reservations/{id}/cancel as CUSTOMER. Expected: CANCELLED.

## TC-RES-13: Notification Created
After creating a reservation, GET /api/notifications. Expected: notification with type RESERVATION.
