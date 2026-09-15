# Backend Test Map — Table Reservations

## TableServiceTest

| Test | Scenario | Expected |
|------|----------|----------|
| createTableSuccess | Valid table data | Table saved |
| createTableDuplicateNumber | Same tableNumber | 409 Conflict |
| updateTableStatus | Change to OUT_OF_SERVICE | Status updated |

## ReservationServiceTest

| Test | Scenario | Expected |
|------|----------|----------|
| checkAvailabilityFound | Tables available | List returned |
| checkAvailabilityNone | All blocked | Empty list + alternative times |
| createReservationSuccess | Valid future reservation | Saved, reference generated, notification created |
| createReservationOverlap | Same table, overlapping time | 409 ResourceConflictException |
| createReservationPastDate | Past date | 400 ValidationException |
| createReservationCapacityExceeded | guestCount > capacity | 400 |
| createReservationOutOfService | Table is OUT_OF_SERVICE | 400 or 409 |
| customerCannotSeeOtherReservation | Wrong customer JWT | 403 |
| cancelFutureReservation | Valid future reservation | Status CANCELLED |
| checkInSuccess | Confirmed reservation | Status CHECKED_IN, table OCCUPIED |
| completeSuccess | Checked-in reservation | Status COMPLETED, table AVAILABLE |
| noShowSuccess | Confirmed reservation | Status NO_SHOW, table AVAILABLE |
| reservationAndNotificationTransactional | Exception during notification | Neither saved |

## Run
```bash
./mvnw test -Dtest="ReservationServiceTest,TableServiceTest"
```
