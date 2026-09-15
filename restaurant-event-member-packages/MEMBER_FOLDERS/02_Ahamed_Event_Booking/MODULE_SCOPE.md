# Module Scope — Event Booking

## In Scope
- EventHall CRUD: POST/GET/PUT/DELETE /api/admin/halls
- EventPackage CRUD: POST/GET/PUT/DELETE /api/admin/packages
- Hall availability check: GET /api/events/availability
- Event booking (customer): POST /api/events/bookings
- Customer's own bookings: GET /api/events/bookings/my
- Booking detail: GET /api/events/bookings/{id}
- Coordinator approval: PATCH /api/event-coordinator/bookings/{id}/approve
- Coordinator rejection: PATCH /api/event-coordinator/bookings/{id}/reject
- Event calendar: GET /api/event-coordinator/calendar
- Invoice CRUD: /api/billing/invoices
- Payment recording: /api/billing/payments
- Cashier invoice management: /api/cashier/*

## Out of Scope
- Table reservations (Module 04)
- Food orders (Module 03)
- User management (Module 01)
- Inventory deduction (Module 05)
- Staff scheduling (Module 06)

## Boundary Interfaces
- NotificationService.createEventNotification() called on booking status changes.
- AuditLog entry created on approval/rejection.
- billing module is partially shared (food order invoices owned by Module 03 side of billing).
