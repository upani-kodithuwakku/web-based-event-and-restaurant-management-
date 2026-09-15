# Manual Test Cases — Event Booking

## TC-EVT-01: Create Hall
Admin creates a hall. Expected: 201, hall appears in GET /api/events/halls.

## TC-EVT-02: Check Availability (Available)
GET /api/events/availability with a date/time not booked. Expected: available: true.

## TC-EVT-03: Create Booking
Customer creates booking for available slot. Expected: 201, status PENDING, reference generated.

## TC-EVT-04: Overlapping Booking
Customer creates second booking for same hall, same date, overlapping hours. Expected: 409 Conflict.

## TC-EVT-05: Guest Count Exceeds Package
Customer creates booking with guestCount > package.maximumGuests. Expected: 400 Bad Request.

## TC-EVT-06: Coordinator Approves
Coordinator calls PATCH .../approve. Expected: status becomes APPROVED, notification sent to customer.

## TC-EVT-07: Coordinator Rejects Without Reason
PATCH .../reject with empty rejectionReason. Expected: 400 Bad Request.

## TC-EVT-08: Customer Cannot Approve
CUSTOMER JWT calls PATCH .../approve. Expected: 403 Forbidden.

## TC-BILL-01: Create Invoice
Cashier creates invoice for approved booking. Expected: 201, invoice number generated.

## TC-BILL-02: Record Full Payment
Cashier records payment equal to totalAmount. Expected: invoice status becomes PAID.

## TC-BILL-03: Record Partial Payment
Payment less than totalAmount. Expected: invoice status PARTIALLY_PAID.
