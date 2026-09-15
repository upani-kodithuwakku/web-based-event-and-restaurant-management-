# Frontend Flow — Staff Scheduling

## Staff.tsx (pages/admin/Staff.tsx)

This is a tabbed admin page for complete staff management:

### Staff Members tab
- List all staff profiles with job title, employment status, employee code.
- Create staff user button: opens a form to create a new User + StaffProfile in one step.
- Edit and employment status change actions.
- TERMINATED staff shown greyed out.

### Shifts tab
- Date range picker to view schedule for a week or day.
- Each shift card shows date, time, required role, required count, and assigned staff count.
- Understaffed shifts highlighted (assigned < required).
- Create shift form: date, start/end time, role required, required count.
- Click shift -> see assignments, with an "Add Staff" button.
- Add Staff: dropdown of available (non-conflicting) staff. Assign button calls staffApi.assignStaff().
- Remove assignment button on each assigned staff row.

### Attendance tab
- Select a date to view shift assignments for that day.
- Each assignment shows: staff name, shift time, check-in, check-out, attendance status.
- Record attendance: click a record to enter check-in or check-out time.

## API Calls (services/api.ts — staffApi)

```typescript
staffApi.getProfiles()                        // GET /api/staff/profiles
staffApi.createStaffUser(data)                // POST /api/staff/users
staffApi.updateProfile(id, data)              // PUT /api/staff/profiles/{id}
staffApi.getShifts(params)                    // GET /api/staff/shifts
staffApi.createShift(data)                    // POST /api/staff/shifts
staffApi.assignStaff(shiftId, data)           // POST /api/staff/shifts/{id}/assign
staffApi.removeAssignment(shiftId, assignId)  // DELETE /api/staff/shifts/{shiftId}/assignments/{id}
staffApi.getSchedule(params)                  // GET /api/staff/schedule
staffApi.recordAttendance(data)               // POST /api/staff/attendance
staffApi.getAttendance(params)                // GET /api/staff/attendance
```
