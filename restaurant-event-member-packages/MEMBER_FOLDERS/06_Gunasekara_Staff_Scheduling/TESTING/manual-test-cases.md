# Manual Test Cases — Staff Scheduling

## TC-STF-01: Create Staff User
POST /api/staff/users as ADMIN. Expected: 201, User and StaffProfile created, employee code generated.

## TC-STF-02: Create Shift
POST /api/staff/shifts. Expected: 201 with shift id.

## TC-STF-03: Assign Staff (No Conflict)
POST /api/staff/shifts/{id}/assign with valid staffProfileId. Expected: 200/201, notification sent.

## TC-STF-04: Assignment Conflict
Assign same staff to overlapping shift on same date. Expected: 409 Conflict.

## TC-STF-05: Understaffed Shift
Create shift with requiredStaffCount=3, assign 1 staff. GET /api/staff/shifts/{id}. Expected: response indicates understaffed.

## TC-STF-06: Assign Terminated Staff
Set employmentStatus=TERMINATED. Attempt assignment. Expected: 400 Bad Request.

## TC-STF-07: View Schedule
GET /api/staff/schedule?startDate=2026-09-20&endDate=2026-09-26. Expected: shifts grouped by date.

## TC-STF-08: Record Attendance
POST /api/staff/attendance with shiftAssignmentId and check-in time. Expected: 201.

## TC-STF-09: View Attendance History
GET /api/staff/attendance?date=2026-09-20. Expected: all attendance records for that date.

## TC-STF-10: CUSTOMER Cannot Access Staff Endpoints
GET /api/staff/profiles with CUSTOMER JWT. Expected: 403 Forbidden.
