# Member 04 — Table Reservations Module

**Member:** Kodithuwakku U.A.A.
**Module:** Table Reservation Management
**Roles:** CUSTOMER, WAITER, ADMIN, MANAGER

## Module Summary

This is the primary module of the system. It manages:

- Restaurant table CRUD (capacity, location, status)
- Table availability search (date, time, party size, seating preference)
- Alternative time suggestions when no tables are free
- Reservation creation with booking reference, contact details, special requests
- Customer reservation history, modification, and cancellation
- Staff floor calendar view (daily reservations by table)
- Staff check-in (PENDING/CONFIRMED -> CHECKED_IN, table -> OCCUPIED)
- Staff complete session (CHECKED_IN -> COMPLETED, table -> AVAILABLE)
- Staff no-show marking (-> NO_SHOW, table -> AVAILABLE)
- Out-of-service table management
- In-app notification on reservation creation and status change

## Backend Modules

```
reservations/ — RestaurantTable, TableReservation entities, TableService, ReservationService,
                ReservationController (customer), AdminReservationController (staff/admin)
```

## Frontend Files

```
pages/Reservations.tsx            — Customer reservations page (list, create, modify, cancel)
pages/Discover.tsx                — Table/restaurant discovery page
pages/admin/AdminReservations.tsx — Staff daily calendar and status actions
pages/admin/Tables.tsx            — Admin table CRUD
components/BookingModal.tsx       — Reservation creation form modal
services/api.ts                   — reservationApi, tableApi sections
services/availability.ts          — Availability check logic
```

## Key Business Rules

1. Reservations cannot be created for past dates or times.
2. Table capacity must be >= guest count.
3. OUT_OF_SERVICE tables cannot be reserved.
4. Backend enforces overlap: PENDING, CONFIRMED, CHECKED_IN block a time slot.
5. CANCELLED, COMPLETED, NO_SHOW do not block.
6. Booking reference format: RES-YYYYMMDD-XXXX (unique).
7. Default reservation duration: 120 minutes (configurable).
8. Reservation creation, table assignment, and notification are @Transactional.
9. A customer can only see/edit/cancel their own reservations.
10. Check-in: reservation -> CHECKED_IN, table -> OCCUPIED.
11. Complete: reservation -> COMPLETED, table -> AVAILABLE.
12. No-show: reservation -> NO_SHOW, table -> AVAILABLE.
