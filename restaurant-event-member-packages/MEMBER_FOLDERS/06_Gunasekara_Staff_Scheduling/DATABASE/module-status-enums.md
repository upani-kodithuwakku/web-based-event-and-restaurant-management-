# Status Enums — Staff Scheduling

## ShiftStatus
Located in: `com.group06.restaurantevent.common.enums.ShiftStatus`
Values:
- SCHEDULED — shift is planned
- IN_PROGRESS — shift is currently active
- COMPLETED — shift ended
- CANCELLED — shift cancelled

## EmploymentStatus
Located in: `com.group06.restaurantevent.common.enums.EmploymentStatus`
Values:
- FULL_TIME
- PART_TIME
- CONTRACT
- TERMINATED

Note: TERMINATED staff should not be assigned to future shifts.

## AttendanceStatus (VARCHAR in DB)
Values:
- PRESENT — arrived on time
- LATE — arrived after shift start time
- ABSENT — did not attend
- HALF_DAY — left early or arrived very late
