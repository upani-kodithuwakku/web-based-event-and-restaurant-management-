# Frontend Flow — Event Booking

## Customer Event Flow (pages/Events.tsx)

1. Page loads all active halls and packages via eventApi.getHalls(), eventApi.getPackages().
2. Customer selects a hall, a package, event date, times, and guest count.
3. Availability check triggers eventApi.checkAvailability() before submission.
4. Booking form submitted via eventApi.createBooking().
5. On success, booking reference displayed; notification created by backend.
6. Customer's booking history visible in a tab via eventApi.getMyBookings().

## Coordinator Flow (pages/admin/AdminEvents.tsx)

1. Lists all bookings (all statuses) via eventApi.getAllBookings().
2. Calendar view shows confirmed/approved events by date.
3. Approve button calls eventApi.approveBooking(id).
4. Reject button opens a modal to enter rejection reason, then calls eventApi.rejectBooking(id, reason).
5. Status badges: PENDING (yellow), APPROVED (green), REJECTED (red), CANCELLED (grey).

## Cashier Flow (pages/admin/Cashier.tsx)

1. Cashier searches for an event booking or food order by reference.
2. Creates an invoice via billingApi.createInvoice().
3. Records payment via billingApi.recordPayment() selecting method (CASH/CARD/ONLINE).
4. Invoice status updates automatically from PENDING to PAID.

## API Calls (services/api.ts)

```typescript
eventApi.getHalls()                        // GET /api/events/halls
eventApi.getPackages()                     // GET /api/events/packages
eventApi.checkAvailability(params)         // GET /api/events/availability
eventApi.createBooking(data)               // POST /api/events/bookings
eventApi.getMyBookings()                   // GET /api/events/bookings/my
eventApi.getAllBookings()                  // GET /api/event-coordinator/bookings
eventApi.approveBooking(id)               // PATCH /api/event-coordinator/bookings/{id}/approve
eventApi.rejectBooking(id, reason)        // PATCH /api/event-coordinator/bookings/{id}/reject
billingApi.createInvoice(data)            // POST /api/billing/invoices
billingApi.recordPayment(data)            // POST /api/billing/payments
billingApi.getInvoice(id)                 // GET /api/billing/invoices/{id}
```
