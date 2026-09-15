# Module Scope — Staff Scheduling

## In Scope
- StaffProfile CRUD: /api/staff/profiles
- Create staff user (creates both User and StaffProfile): /api/staff/users
- Shift CRUD: /api/staff/shifts
- Shift assignment: POST /api/staff/shifts/{id}/assign
- Remove assignment: DELETE /api/staff/shifts/{id}/assignments/{assignmentId}
- Weekly schedule view: GET /api/staff/schedule?startDate=&endDate=
- Attendance record: POST /api/staff/attendance
- View attendance history: GET /api/staff/attendance?staffId=&date=

## Out of Scope
- Auth (Module 01 owns User creation)
- Inventory, events, menu, billing
- Payroll calculation (not in scope for this project)

## Boundary Interfaces
- StaffProfile.userId references users.id (Module 01 users table).
- NotificationService.createShiftNotification() called when a staff member is assigned to a shift.
- The special CreateStaffUserRequest DTO creates a User + StaffProfile atomically.
