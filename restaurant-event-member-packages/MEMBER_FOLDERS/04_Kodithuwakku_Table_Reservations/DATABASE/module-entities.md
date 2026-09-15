# Entities — Table Reservations

## RestaurantTable
Package: `com.group06.restaurantevent.reservations.entity`
Fields: id, tableNumber, capacity, location, currentStatus (TableStatus), isActive, createdAt, updatedAt

## TableReservation
Package: `com.group06.restaurantevent.reservations.entity`
Fields: id, bookingReference, customer (ManyToOne User), table (ManyToOne RestaurantTable), reservationDate, startTime, endTime, guestCount, seatingPreference, specialRequest, status (ReservationStatus), contactName, contactPhone, cancelReason, createdAt, updatedAt
