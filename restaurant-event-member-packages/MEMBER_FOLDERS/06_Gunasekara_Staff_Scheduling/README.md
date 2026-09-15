# Member 06 — Staff Scheduling Module

**Member:** Gunasekara M.N.
**Module:** Staff Scheduling and Attendance
**Roles:** ADMIN, MANAGER

## Module Summary

This module manages the entire HR scheduling and attendance workflow:

- Staff profile management (linked to User account)
- Employee code generation and tracking
- Shift creation (date, time range, role requirement, required staff count)
- Staff assignment to shifts with conflict detection
- Understaffed shift warnings
- Schedule publication / status management
- Attendance check-in and check-out recording
- Attendance history and status tracking (PRESENT, LATE, ABSENT, HALF_DAY)
- Shift notifications for assigned staff

## Backend Modules

```
staff/ — StaffProfile, Shift, ShiftAssignment, AttendanceRecord entities,
         StaffService, StaffController
```

## Frontend Files

```
pages/admin/Staff.tsx   — Full staff scheduling management UI
services/api.ts         — staffApi section
```

## Key Business Rules

1. A staff member cannot be assigned to two shifts that overlap on the same date.
2. A shift is understaffed when the number of assignments < shift.requiredStaffCount.
3. The staffProfile.userId links the scheduling record to the auth User entity.
4. Only ADMIN or MANAGER can create shifts, assign staff, and view schedules.
5. Attendance records link to ShiftAssignment (not to Shift directly).
6. Employment statuses: FULL_TIME, PART_TIME, CONTRACT, TERMINATED.
7. TERMINATED staff cannot be assigned to future shifts.
