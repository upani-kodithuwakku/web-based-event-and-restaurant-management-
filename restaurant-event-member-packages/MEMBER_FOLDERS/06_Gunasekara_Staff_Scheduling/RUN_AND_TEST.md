# Run and Test — Staff Scheduling

## Prerequisites
- Backend running, ADMIN role seeded, ADMIN user exists
- At least one WAITER, KITCHEN_STAFF user to assign to shifts

## Seed Test Staff

POST /api/staff/users (as ADMIN):
```json
{
  "fullName": "Jane Waiter", "email": "jane@restaurant.com",
  "phone": "0771111111", "password": "Pass123!", "role": "WAITER",
  "jobTitle": "Waiter", "employmentStatus": "FULL_TIME", "joinedDate": "2026-01-01"
}
```

## Manual Tests

### Create Shift
```
POST /api/staff/shifts
Authorization: Bearer <admin_token>
{
  "shiftDate": "2026-09-20",
  "startTime": "08:00",
  "endTime": "16:00",
  "roleRequired": "WAITER",
  "requiredStaffCount": 2
}
```
Expected: 201

### Assign Staff
```
POST /api/staff/shifts/1/assign
{"staffProfileId": 2, "assignedRole": "WAITER"}
```
Expected: 200 or 201, assignment created.

### Shift Conflict
Assign the same staff member to another shift on same date with overlapping hours.
Expected: 409 Conflict.

### Understaffed Warning
Create shift with requiredStaffCount=3 and assign only 1 staff.
GET /api/staff/shifts/1 — Expected: response includes understaffed indicator.

### Record Attendance
```
POST /api/staff/attendance
{
  "shiftAssignmentId": 1,
  "checkInAt": "2026-09-20T08:05:00",
  "attendanceStatus": "PRESENT"
}
```
Expected: 201

### View Schedule
```
GET /api/staff/schedule?startDate=2026-09-20&endDate=2026-09-26
```
Expected: shifts grouped by date.

## Run Tests
```bash
./mvnw test -Dtest="StaffServiceTest"
```
