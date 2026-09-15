# Entities — Event Booking

## EventHall
Package: `com.group06.restaurantevent.events.entity`
Fields: id, name, capacity, location, description, isActive

## EventPackage
Package: `com.group06.restaurantevent.events.entity`
Fields: id, name, eventType, description, basePrice, minimumGuests, maximumGuests, isActive

## EventBooking
Package: `com.group06.restaurantevent.events.entity`
Fields: id, bookingReference, customer (ManyToOne User), hall (ManyToOne EventHall), eventPackage (ManyToOne EventPackage), eventDate, startTime, endTime, guestCount, specialRequirements, status (EventBookingStatus), rejectionReason, depositAmount, createdAt, updatedAt

## Invoice
Package: `com.group06.restaurantevent.billing.entity`
Fields: id, invoiceNumber, customer (ManyToOne User), foodOrder (ManyToOne, nullable), eventBooking (ManyToOne, nullable), invoiceType, subtotal, serviceCharge, taxAmount, discountAmount, totalAmount, status (InvoiceStatus), issuedAt

## InvoiceItem
Package: `com.group06.restaurantevent.billing.entity`
Fields: id, invoice (ManyToOne), description, quantity, unitPrice, lineTotal

## Payment
Package: `com.group06.restaurantevent.billing.entity`
Fields: id, paymentReference, invoice (ManyToOne), amount, method (PaymentMethod), status (PaymentStatus), paidAt, gatewayReference
