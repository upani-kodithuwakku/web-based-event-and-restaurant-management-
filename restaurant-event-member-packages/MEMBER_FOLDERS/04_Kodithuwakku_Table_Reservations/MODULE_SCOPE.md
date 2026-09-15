# Module Scope — Table Reservations

## In Scope

Customer:
- GET /api/reservations/availability — search available tables
- POST /api/reservations — create reservation
- GET /api/reservations/my — own reservations
- GET /api/reservations/{id} — own reservation detail
- PUT /api/reservations/{id} — modify own future reservation
- PATCH /api/reservations/{id}/cancel — cancel own future reservation

Admin/Staff:
- GET /api/admin/reservations — daily reservation list (filterable by date/status)
- PATCH /api/admin/reservations/{id}/check-in
- PATCH /api/admin/reservations/{id}/complete
- PATCH /api/admin/reservations/{id}/no-show
- GET /api/admin/tables — list all tables
- POST /api/admin/tables — create table
- PUT /api/admin/tables/{id} — update table
- PATCH /api/admin/tables/{id}/status — change table status
- DELETE /api/admin/tables/{id} — deactivate table

## Out of Scope
- Event bookings (Module 02)
- Food orders (Module 03)
- User management (Module 01)
- Inventory (Module 05)
- Staff scheduling (Module 06)

## Boundary Interfaces
- NotificationService.createReservationNotification() called on create and status change.
- FoodOrder references table_id and reservation_id (Module 03 reads tables).
