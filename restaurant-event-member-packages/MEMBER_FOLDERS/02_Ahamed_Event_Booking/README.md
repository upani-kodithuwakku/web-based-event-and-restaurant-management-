# Member 02 — Event Booking Module

**Member:** Ahamed M.I.I.
**Module:** Event Booking (Events + Billing)
**Roles:** CUSTOMER, EVENT_COORDINATOR, ADMIN, MANAGER

## Module Summary

This module manages the complete event lifecycle from hall and package setup through booking, approval/rejection, invoicing, and simulated payment.

- Event hall CRUD (capacity, location, availability)
- Event package CRUD (type, pricing, guest limits)
- Hall availability check (date, start/end time, guest count)
- Customer event booking request
- Coordinator approval and rejection workflow
- Event calendar view for coordinators
- Invoice generation for approved events
- Simulated payment processing (CASH, CARD, ONLINE)
- Customer event booking history

## Backend Modules

```
events/   — EventHall, EventPackage, EventBooking entities, service, controllers
billing/  — Invoice, InvoiceItem, Payment entities, service, controller
```

## Frontend Files

```
pages/Events.tsx               — Customer event browsing and booking request
pages/admin/AdminEvents.tsx    — Coordinator/admin event management, approval
pages/admin/Cashier.tsx        — Invoice creation and payment recording
services/api.ts                — eventApi, billingApi sections
```

## Design Patterns Implemented

- **Strategy Pattern** — `PaymentStrategy` interface with `CashPaymentStrategy`, `CardPaymentStrategy`, and `MockOnlinePaymentStrategy`. BillingService selects the strategy based on the payment method.

## Key Business Rules

1. A hall cannot have two approved/pending bookings with overlapping time slots on the same date.
2. Guest count must be within package minimumGuests and maximumGuests.
3. Only EVENT_COORDINATOR, ADMIN, or MANAGER can approve or reject a booking.
4. Rejection requires a rejection reason.
5. An invoice belongs to exactly one event booking (not a food order).
6. Payment status drives invoice status (PAID, PARTIAL, PENDING).
7. Deposit amount is recorded at booking time; full payment recorded at cashier.
