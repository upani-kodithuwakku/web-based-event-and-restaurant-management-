# Frontend Flow — Table Reservations

## Customer Reservation Flow (pages/Reservations.tsx)

1. Page loads customer's existing reservations via reservationApi.getMyReservations().
2. Status badges: PENDING (yellow), CONFIRMED (blue), CHECKED_IN (green), COMPLETED (grey), CANCELLED (red), NO_SHOW (dark grey).
3. "New Reservation" button opens BookingModal.tsx.

## Booking Modal (components/BookingModal.tsx)

1. Customer selects date, time, party size, optional seating preference.
2. On "Check Availability": calls availability.ts which calls reservationApi.checkAvailability().
3. Available tables shown as selectable cards.
4. If no tables: alternative times suggested.
5. Customer fills contact name, phone, special request.
6. Submit: reservationApi.createReservation() -> POST /api/reservations.
7. Success: modal closes, booking reference shown, reservation list refreshed.

## Table Discovery (pages/Discover.tsx)

1. Shows restaurant layout map or table grid.
2. Table status shown by colour: green = AVAILABLE, yellow = RESERVED, red = OCCUPIED, grey = OUT_OF_SERVICE.
3. Click table -> shows current status and any upcoming reservation.

## Admin Reservations (pages/admin/AdminReservations.tsx)

1. Date picker defaults to today. Loads reservations for selected date.
2. Each reservation card shows table number, guest name, time, status.
3. Action buttons per status:
   - CONFIRMED -> "Check In" button
   - CHECKED_IN -> "Complete" and "No Show" buttons
4. Action calls relevant admin endpoint.

## Admin Tables (pages/admin/Tables.tsx)

1. Lists all tables with status badges.
2. Create, edit, toggle out-of-service buttons.
3. Status change via tableApi.updateTableStatus(id, status).

## API Calls (services/api.ts, services/availability.ts)

```typescript
reservationApi.checkAvailability(params)      // GET /api/reservations/availability
reservationApi.createReservation(data)        // POST /api/reservations
reservationApi.getMyReservations()            // GET /api/reservations/my
reservationApi.getReservation(id)             // GET /api/reservations/{id}
reservationApi.updateReservation(id, data)    // PUT /api/reservations/{id}
reservationApi.cancelReservation(id)          // PATCH /api/reservations/{id}/cancel
adminReservationApi.getReservations(params)   // GET /api/admin/reservations
adminReservationApi.checkIn(id)               // PATCH /api/admin/reservations/{id}/check-in
adminReservationApi.complete(id)              // PATCH /api/admin/reservations/{id}/complete
adminReservationApi.noShow(id)                // PATCH /api/admin/reservations/{id}/no-show
tableApi.getTables()                          // GET /api/admin/tables
tableApi.createTable(data)                    // POST /api/admin/tables
tableApi.updateTable(id, data)                // PUT /api/admin/tables/{id}
tableApi.updateTableStatus(id, status)        // PATCH /api/admin/tables/{id}/status
```
