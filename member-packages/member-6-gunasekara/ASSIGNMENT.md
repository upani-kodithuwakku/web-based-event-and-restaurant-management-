# Member 6 — Your Assignment
## Gunasekara G.A.D.I.
**Module: Staff Scheduling & Attendance**
**Branch: `feature/staff-scheduling`**

---

## Your Git Setup

```bash
git clone <your-team-repo-url>
cd web-based-event-and-restaurant-management-
git checkout develop && git pull origin develop
git checkout -b feature/staff-scheduling
```

---

## Run the Project

```bash
# Terminal 1 — Backend
cd restaurant-event-backend && cp .env.example .env && mvn spring-boot:run

# Terminal 2 — Frontend
cd restaurant-event-frontend && npm install && npm run dev
```
Frontend: http://localhost:5173  →  Admin workspace → Staff

---

## Your Backend Files (empty skeleton — YOU implement everything)

```
restaurant-event-backend/src/main/java/com/group06/restaurantevent/staff/
├── entity/
│   ├── StaffProfile.java         ← id, userId (FK), employeeCode, jobTitle,
│   │                                employmentStatus, joinedDate
│   ├── Shift.java                ← id, shiftDate, startTime, endTime,
│   │                                roleRequired, requiredStaffCount, status
│   ├── ShiftAssignment.java      ← id, shiftId, staffId, assignedRole, status
│   └── AttendanceRecord.java     ← id, shiftAssignmentId, checkInAt,
│                                    checkOutAt, attendanceStatus
├── dto/request/
│   ├── CreateStaffProfileRequest.java
│   ├── CreateShiftRequest.java
│   ├── AssignShiftRequest.java
│   └── RecordAttendanceRequest.java
├── dto/response/
│   ├── StaffProfileResponse.java
│   ├── ShiftResponse.java
│   ├── ShiftAssignmentResponse.java
│   └── AttendanceResponse.java
├── repository/
│   ├── StaffProfileRepository.java
│   ├── ShiftRepository.java
│   ├── ShiftAssignmentRepository.java
│   └── AttendanceRecordRepository.java
├── service/
│   ├── StaffService.java         ← profiles, conflict detection
│   └── AttendanceService.java    ← check-in/out, attendance report
├── controller/
│   ├── StaffController.java      ← ADMIN + MANAGER endpoints
│   └── AttendanceController.java
└── mapper/
    └── StaffMapper.java
```

---

## Business Rules You Must Enforce

1. A staff member cannot be assigned two overlapping shifts (same date, overlapping time window).
2. The `roleRequired` on a shift must match the staff member's role in the users system.
3. `employeeCode` must be unique — format: `EMP-XXXX` (4-digit random suffix).
4. Shift status flow:
   ```
   SCHEDULED → IN_PROGRESS → COMPLETED
                            ↘ CANCELLED
   ```
5. Assignment status flow:
   ```
   ASSIGNED → CHECKED_IN → CHECKED_OUT
            ↘ NO_SHOW
   ```
6. Attendance check-in must be within 15 minutes before shift start.
7. Only `ADMIN` and `MANAGER` can create/modify shifts and assignments.
8. `employmentStatus` options: `FULL_TIME`, `PART_TIME`, `CONTRACT`.
9. An `AuditLog` must be created for every shift assignment change.
10. `isActive` on `StaffProfile` — deactivate instead of delete.

---

## Endpoints to Implement

```
# Staff profiles — ADMIN + MANAGER
GET    /api/admin/staff
GET    /api/admin/staff/{id}
POST   /api/admin/staff
PUT    /api/admin/staff/{id}
PATCH  /api/admin/staff/{id}/status   ← activate/deactivate

# Shifts
GET    /api/admin/shifts?date=2026-10-01
POST   /api/admin/shifts
PUT    /api/admin/shifts/{id}
DELETE /api/admin/shifts/{id}         ← only if SCHEDULED, sets status=CANCELLED

# Shift assignments
GET    /api/admin/shifts/{shiftId}/assignments
POST   /api/admin/shifts/{shiftId}/assign   ← body: { staffId }
DELETE /api/admin/shifts/{shiftId}/assignments/{staffId}  ← unassign

# Attendance — staff self-service
POST   /api/attendance/check-in       ← body: { shiftAssignmentId }
POST   /api/attendance/check-out      ← body: { shiftAssignmentId }

# Attendance report — ADMIN + MANAGER
GET    /api/admin/attendance?staffId=&from=&to=
```

---

## Your Frontend Files (EXISTS — connect to real API)

```
frontend-files/Staff.tsx   ← Admin staff panel (built in demo mode)
```

### What to IMPROVE in Staff.tsx

- Remove/conditionally hide demo-mode seed data when VITE_DEMO_MODE=false.
- Wire "Add Staff" modal to `POST /api/admin/staff`.
- Wire shift assignment (click staff initials) to `POST /api/admin/shifts/{id}/assign`.
- Wire unassign to `DELETE /api/admin/shifts/{id}/assignments/{staffId}`.
- Conflict detection: grey out staff whose shift overlaps when assigning.

### Frontend pages YOU need to add

- `src/pages/admin/Attendance.tsx` — attendance log with date range filter and summary per staff.

---

## Design Pattern You Must Implement

### Strategy Pattern — Conflict Detection

```java
public interface ShiftConflictStrategy {
    boolean hasConflict(Long staffId, LocalDate date, LocalTime start, LocalTime end);
}

@Component("strictOverlapStrategy")
public class StrictOverlapConflictStrategy implements ShiftConflictStrategy {
    // Rejects even 1-minute overlaps
}

@Component("bufferConflictStrategy")
public class BufferConflictStrategy implements ShiftConflictStrategy {
    // Adds 30-minute buffer between shifts
}
```

Use `StrictOverlapConflictStrategy` as the default. Document in your assessment submission that you implemented this pattern.

---

## Tests You Must Write

Location: `src/test/java/com/group06/restaurantevent/staff/`

```java
// 1. Assign two overlapping shifts to same staff → 409
// 2. employeeCode is unique (second staff with same code → 409)
// 3. Role mismatch on shift assignment → 400
// 4. Check-in outside the 15-minute window → 400
// 5. CUSTOMER cannot access /api/admin/staff (403)
// 6. Deactivating a staff profile removes them from future shift pool
// 7. Shift cannot be deleted if already IN_PROGRESS
// 8. AuditLog created on shift assignment change
```

---

## Commit Messages

```
feat(staff): add staff profile CRUD
feat(staff): add shift creation and management
feat(staff): add shift assignment with conflict detection
feat(staff): add attendance check-in/check-out
feat(staff): add attendance report endpoint
test(staff): reject overlapping shift assignment
test(staff): verify audit log on assignment change
```

---

## Pull Request Checklist

- [ ] `mvn test` passes
- [ ] `npm run build` passes
- [ ] Shift conflict tested with Swagger
- [ ] ADMIN/MANAGER role enforced
- [ ] Attendance report returns correct data
- [ ] AuditLog entries created for assignments
- [ ] No `.env` committed
- [ ] You can explain the conflict detection strategy

---

## Files in This Package

```
backend-module/staff/    ← Empty — YOU implement
frontend-files/Staff.tsx ← Existing admin staff page
```

*Group 06 · SLIIT 2026*
