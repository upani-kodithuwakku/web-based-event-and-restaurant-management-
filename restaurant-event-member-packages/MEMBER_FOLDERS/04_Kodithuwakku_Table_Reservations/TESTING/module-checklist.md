# Module Completion Checklist — Table Reservations

## Backend
- [ ] RestaurantTable entity with all fields
- [ ] Table CRUD endpoints (admin only)
- [ ] Table status change endpoint
- [ ] Table seeded (8-12 tables on startup)
- [ ] Availability search query (date/time/guests/preference)
- [ ] Alternative time suggestions when no tables available
- [ ] Reservation creation with overlap prevention (409 on overlap)
- [ ] Booking reference generated: RES-YYYYMMDD-XXXX
- [ ] Past date validation (400)
- [ ] Capacity validation (400)
- [ ] OUT_OF_SERVICE validation (400/409)
- [ ] Customer can only access own reservations (403)
- [ ] Modify future reservation
- [ ] Cancel reservation
- [ ] Staff check-in: reservation CHECKED_IN, table OCCUPIED
- [ ] Staff complete: reservation COMPLETED, table AVAILABLE
- [ ] Staff no-show: reservation NO_SHOW, table AVAILABLE
- [ ] Notification created on reservation creation (@Transactional)
- [ ] Swagger documents all endpoints

## Frontend
- [ ] Reservations.tsx loads customer reservations with status badges
- [ ] BookingModal.tsx validates date, time, guests
- [ ] Availability check shows results or alternatives
- [ ] Booking created and reference shown
- [ ] Cancel reservation works
- [ ] AdminReservations.tsx date picker + filter works
- [ ] Check-in, Complete, No-show actions work
- [ ] Tables.tsx CRUD works
- [ ] Discover.tsx shows table status

## Tests
- [ ] ReservationServiceTest: overlap, past date, capacity, OUT_OF_SERVICE all fail
- [ ] ReservationServiceTest: check-in, complete, no-show transitions pass
- [ ] TableServiceTest: CRUD and status change pass

## Database
- [ ] restaurant_tables and table_reservations tables created
- [ ] Indexes on reservation_date, table_id
- [ ] No secrets committed
