# Status Enums — Table Reservations

## TableStatus
Located in: `com.group06.restaurantevent.common.enums.TableStatus`
Values:
- AVAILABLE — table is free to reserve
- RESERVED — confirmed upcoming reservation
- OCCUPIED — customer currently dining (checked in)
- OUT_OF_SERVICE — maintenance or disabled

## ReservationStatus
Located in: `com.group06.restaurantevent.common.enums.ReservationStatus`
Values:
- PENDING — created but not yet confirmed by staff
- CONFIRMED — staff confirmed the reservation
- CHECKED_IN — customer arrived and checked in
- COMPLETED — dining session ended, table released
- CANCELLED — cancelled by customer or admin
- NO_SHOW — customer did not arrive, table released

## Which statuses block a time slot?
Active blocking statuses: PENDING, CONFIRMED, CHECKED_IN
Non-blocking (released) statuses: CANCELLED, COMPLETED, NO_SHOW
