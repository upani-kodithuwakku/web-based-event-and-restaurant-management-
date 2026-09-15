# Module Completion Checklist — Event Booking

## Backend
- [ ] EventHall entity and CRUD endpoints
- [ ] EventPackage entity and CRUD endpoints
- [ ] Hall availability query with overlap check
- [ ] EventBooking creation (PENDING status, reference generated)
- [ ] Coordinator approval endpoint
- [ ] Coordinator rejection endpoint (reason required)
- [ ] Customer cannot approve/reject
- [ ] Overlap returns 409
- [ ] Guest count validated against package limits
- [ ] Notification sent on status change
- [ ] Invoice creation for event booking
- [ ] Payment recording with strategy pattern
- [ ] Invoice status updated after payment
- [ ] Swagger documents all endpoints

## Frontend
- [ ] Events.tsx loads halls and packages
- [ ] Availability check before booking form submit
- [ ] Booking reference displayed on success
- [ ] AdminEvents.tsx shows pending bookings
- [ ] Approve and reject actions work
- [ ] Cashier.tsx creates invoice and records payment
- [ ] Payment status reflected correctly

## Tests
- [ ] EventBookingServiceTest passes
- [ ] BillingServiceTest passes
- [ ] Overlap prevention test passes
- [ ] Strategy pattern test passes

## Database
- [ ] event_halls, event_packages, event_bookings tables created
- [ ] invoices, payments tables created
- [ ] No secrets committed
