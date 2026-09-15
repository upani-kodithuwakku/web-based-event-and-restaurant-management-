# Status Enums — Event Booking

## EventBookingStatus
Located in: `com.group06.restaurantevent.common.enums.EventBookingStatus`
Values:
- PENDING — awaiting coordinator review
- APPROVED — coordinator approved
- REJECTED — coordinator rejected with reason
- CANCELLED — customer cancelled
- COMPLETED — event concluded

## InvoiceStatus
Located in: `com.group06.restaurantevent.common.enums.InvoiceStatus`
Values:
- PENDING — invoice issued, no payment yet
- PARTIALLY_PAID — some payment received
- PAID — fully paid
- REFUNDED — payment refunded
- CANCELLED — invoice voided

## PaymentStatus
Located in: `com.group06.restaurantevent.common.enums.PaymentStatus`
Values:
- PENDING
- PAID
- FAILED
- REFUNDED

## PaymentMethod
Located in: `com.group06.restaurantevent.common.enums.PaymentMethod`
Values:
- CASH
- CARD
- ONLINE
