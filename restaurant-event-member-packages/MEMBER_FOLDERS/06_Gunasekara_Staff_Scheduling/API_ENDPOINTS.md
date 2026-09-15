# API Endpoints — Staff Scheduling

Base URL: http://localhost:8080/api

All endpoints require ADMIN or MANAGER role.

## Staff Profile Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/staff/profiles | List all staff profiles |
| POST | /api/staff/users | Create staff user + profile (atomic) |
| GET | /api/staff/profiles/{id} | Get profile detail |
| PUT | /api/staff/profiles/{id} | Update profile |
| PATCH | /api/staff/profiles/{id}/status | Change employment status |

## Shift Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/staff/shifts | List shifts (filterable by date) |
| POST | /api/staff/shifts | Create shift |
| GET | /api/staff/shifts/{id} | Shift detail with assignments |
| PUT | /api/staff/shifts/{id} | Update shift |
| DELETE | /api/staff/shifts/{id} | Cancel shift |

## Assignment Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/staff/shifts/{id}/assign | Assign staff to shift |
| DELETE | /api/staff/shifts/{shiftId}/assignments/{assignmentId} | Remove assignment |
| GET | /api/staff/schedule?startDate=&endDate= | Weekly/date-range schedule |

## Attendance Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/staff/attendance | Record attendance (check-in or check-out) |
| GET | /api/staff/attendance | Attendance history (filterable by staff, date) |
| PATCH | /api/staff/attendance/{id} | Update attendance record |

## Sample Create Staff User

```json
{
  "fullName": "Jane Waiter",
  "email": "jane@restaurant.com",
  "phone": "0771111111",
  "password": "SecurePass123",
  "role": "WAITER",
  "jobTitle": "Senior Waiter",
  "employmentStatus": "FULL_TIME",
  "joinedDate": "2026-01-15"
}
```

## Sample Create Shift

```json
{
  "shiftDate": "2026-09-20",
  "startTime": "08:00",
  "endTime": "16:00",
  "roleRequired": "WAITER",
  "requiredStaffCount": 3,
  "status": "SCHEDULED"
}
```

## Sample Assign Staff

```json
{
  "staffProfileId": 4,
  "assignedRole": "WAITER"
}
```

Conflict response (409):
```json
{
  "status": 409,
  "error": "Conflict",
  "message": "Staff member already assigned to an overlapping shift on 2026-09-20"
}
```
