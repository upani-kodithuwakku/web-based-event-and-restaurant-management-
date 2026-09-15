# Backend Test Map — Staff Scheduling

## StaffServiceTest

| Test | Scenario | Expected |
|------|----------|----------|
| createStaffProfileSuccess | Valid user + profile data | Both created atomically |
| createShiftSuccess | Valid shift data | Shift saved |
| assignStaffSuccess | Non-conflicting assignment | Assignment created, notification sent |
| assignStaffConflict | Overlapping shift on same date | 409 ResourceConflictException |
| assignTerminatedStaff | Staff has TERMINATED status | 400 exception |
| understaffedDetected | Assignments < required | Shift response shows understaffed flag |
| recordAttendanceSuccess | Valid check-in | AttendanceRecord created |
| getScheduleSuccess | Date range | Shifts with assignments returned |

## Run
```bash
./mvnw test -Dtest="StaffServiceTest"
```
