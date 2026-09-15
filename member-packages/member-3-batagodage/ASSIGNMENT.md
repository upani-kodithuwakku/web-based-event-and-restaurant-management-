# Member 3 — Your Assignment
## Batagodage B.I.
**Module: Event Bookings & Billing / Payments**
**Branch: `feature/event-bookings`**

---

## Your Git Setup

```bash
git clone <your-team-repo-url>
cd web-based-event-and-restaurant-management-
git checkout develop && git pull origin develop
git checkout -b feature/event-bookings
```

---

## Run the Project

```bash
# Terminal 1 — Backend
cd restaurant-event-backend && cp .env.example .env && mvn spring-boot:run

# Terminal 2 — Frontend
cd restaurant-event-frontend && npm install && npm run dev
```
Frontend: http://localhost:5173  →  click "Events & celebrations"

---

## Your Backend Files (empty — YOU implement everything)

```
restaurant-event-backend/src/main/java/com/group06/restaurantevent/
├── events/
│   ├── entity/
│   │   ├── EventHall.java         ← id, name, capacity, location, description, isActive
│   │   ├── EventPackage.java      ← id, name, eventType, basePrice, minGuests, maxGuests, isActive
│   │   └── EventBooking.java      ← id, bookingReference, customerId, hallId, packageId, eventDate,
│   │                                 startTime, endTime, guestCount, status, depositAmount, createdAt
│   ├── dto/request/
│   │   ├── CreateEventBookingRequest.java
│   │   └── UpdateEventBookingRequest.java
│   ├── dto/response/
│   │   ├── EventHallResponse.java
│   │   ├── EventPackageResponse.java
│   │   └── EventBookingResponse.java
│   ├── repository/
│   │   ├── EventHallRepository.java
│   │   ├── EventPackageRepository.java
│   │   └── EventBookingRepository.java
│   ├── service/
│   │   └── EventBookingService.java  ← availability, create, approve, reject, cancel
│   ├── controller/
│   │   ├── EventController.java      ← customer-facing
│   │   └── EventCoordinatorController.java ← coordinator approve/reject
│   └── mapper/
│       └── EventBookingMapper.java
│
└── billing/
    ├── entity/
    │   ├── Invoice.java           ← id, invoiceNumber, customerId, foodOrderId, eventBookingId,
    │   │                             invoiceType, subtotal, serviceCharge, taxAmount, totalAmount, status
    │   ├── InvoiceItem.java       ← id, invoiceId, description, quantity, unitPrice, lineTotal
    │   └── Payment.java           ← id, paymentReference, invoiceId, amount, method, status, paidAt
    ├── dto/request/
    │   ├── CreateInvoiceRequest.java
    │   └── CreatePaymentRequest.java
    ├── dto/response/
    │   ├── InvoiceResponse.java
    │   └── PaymentResponse.java
    ├── service/
    │   └── BillingService.java    ← generate invoice, simulate payment
    └── controller/
        └── BillingController.java
```

---

## Business Rules You Must Enforce

### Events
1. `guestCount` must be between `minimumGuests` and `maximumGuests` of the chosen package.
2. `eventDate` cannot be in the past.
3. Same hall cannot have two overlapping `PENDING` or `CONFIRMED` bookings.
4. Booking reference format: `EVT-YYYYMMDD-XXXX` (random suffix).
5. Status flow:
   ```
   PENDING → CONFIRMED (coordinator approves)
           → REJECTED  (coordinator rejects — must include rejectionReason)
   CONFIRMED → CANCELLED (customer cancels)
   ```
6. Customer can only view and cancel their own bookings.

### Billing
7. An invoice belongs to ONE food order OR ONE event booking, not both.
8. Payment methods: `CASH`, `CARD`, `ONLINE` (all simulated).
9. Payment statuses: `PENDING`, `PAID`, `FAILED`, `REFUNDED`.
10. Tax = 10%, service charge = 10%.

---

## Endpoints to Implement

```
# Events — customer
GET    /api/events/packages
GET    /api/events/halls
GET    /api/events/availability?date=2026-10-15&hallId=1
POST   /api/events/bookings
GET    /api/events/bookings/my
PUT    /api/events/bookings/{id}
PATCH  /api/events/bookings/{id}/cancel

# Events — coordinator
GET    /api/event-coordinator/bookings
PATCH  /api/event-coordinator/bookings/{id}/approve
PATCH  /api/event-coordinator/bookings/{id}/reject

# Admin — hall/package management
POST   /api/admin/event-halls
PUT    /api/admin/event-halls/{id}
POST   /api/admin/event-packages
PUT    /api/admin/event-packages/{id}

# Billing
POST   /api/billing/invoices
GET    /api/billing/invoices/{id}
GET    /api/billing/invoices/my
POST   /api/billing/payments
GET    /api/billing/payments/{invoiceId}
```

---

## Your Frontend Files (partially done)

```
frontend-files/Events.tsx          ← Customer event listing (EXISTS — check it)
frontend-files/AdminEvents.tsx     ← Coordinator approval panel (EXISTS — improve it)
```

### Pages YOU need to add

- `src/pages/customer/EventBookingForm.tsx` — real booking form connected to API
- `src/pages/customer/MyEvents.tsx` — customer event booking history
- `src/pages/admin/Billing.tsx` — invoice list and simulated payment

---

## Tests You Must Write

```java
// 1. Past event date → 400
// 2. Guest count outside package limits → 400
// 3. Same hall same date overlapping → 409
// 4. Customer cannot approve their own event (403)
// 5. Coordinator approval sends notification (check notification created)
// 6. Rejected booking must have rejectionReason
// 7. Invoice total = subtotal + tax + serviceCharge
```

---

## Commit Messages

```
feat(events): add event hall CRUD
feat(events): add hall availability check
feat(events): add booking approval flow
feat(billing): add invoice generation
feat(billing): add simulated payment
test(events): reject overlapping hall bookings
```

---

## Pull Request Checklist

- [ ] `mvn test` passes
- [ ] Booking overlap prevention tested
- [ ] EVENT_COORDINATOR role enforced
- [ ] Billing totals calculated correctly
- [ ] `npm run build` passes
- [ ] No `.env` committed

---

## Files in This Package

```
backend-module/events/         ← Empty — YOU implement
backend-module/billing/        ← Empty — YOU implement
frontend-files/Events.tsx      ← Existing customer events page
frontend-files/AdminEvents.tsx ← Existing coordinator panel
```

*Group 06 · SLIIT 2026*
