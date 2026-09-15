# Backend Test Map — Event Booking

## EventBookingServiceTest

| Test | Scenario | Expected |
|------|----------|----------|
| createBookingSuccess | Valid hall, package, future date | Booking saved, status PENDING |
| createBookingOverlap | Same hall, overlapping time slot | 409 ResourceConflictException |
| createBookingGuestExceedsPackage | guestCount > package.maximumGuests | 400 ValidationException |
| approveBookingSuccess | Coordinator approves PENDING booking | Status APPROVED |
| approveBookingAlreadyProcessed | Approve APPROVED booking | 400 or no-op |
| rejectBookingSuccess | Coordinator rejects with reason | Status REJECTED |
| rejectBookingMissingReason | No rejection reason | 400 |
| customerCannotApprove | CUSTOMER tries to approve | 403 |

## BillingServiceTest

| Test | Scenario | Expected |
|------|----------|----------|
| createInvoiceSuccess | Valid event booking | Invoice created |
| recordPaymentSuccess | Full amount | Invoice status PAID |
| recordPaymentPartial | Partial amount | Invoice status PARTIALLY_PAID |
| paymentStrategySelection | Method CASH -> CashPaymentStrategy | Correct strategy used |

## Run
```bash
./mvnw test -Dtest="EventBookingServiceTest,BillingServiceTest"
```
