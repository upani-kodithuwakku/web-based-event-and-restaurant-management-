# Module Completion Checklist — Staff Scheduling

## Backend
- [ ] StaffProfile entity and CRUD
- [ ] Create staff user endpoint (User + StaffProfile atomic)
- [ ] Employee code auto-generated
- [ ] Shift entity and CRUD
- [ ] ShiftAssignment with conflict detection
- [ ] 409 returned on assignment conflict
- [ ] TERMINATED staff cannot be assigned
- [ ] Understaffed indicator in shift response
- [ ] Notification sent on assignment
- [ ] AttendanceRecord entity and CRUD
- [ ] Weekly schedule endpoint (date range)
- [ ] Attendance history endpoint
- [ ] Admin/Manager only authorization
- [ ] Swagger documents all endpoints

## Frontend
- [ ] Staff.tsx: staff members tab loads and creates
- [ ] Staff.tsx: shifts tab with date filter
- [ ] Understaffed shifts highlighted
- [ ] Add staff validates no conflict
- [ ] Attendance tab records check-in/out

## Tests
- [ ] StaffServiceTest all pass
- [ ] Conflict detection test passes
- [ ] Terminated staff rejection test passes

## Database
- [ ] staff_profiles, shifts, shift_assignments, attendance_records tables created
- [ ] Unique constraint on staff_profiles.user_id
- [ ] Unique constraint on staff_profiles.employee_code
- [ ] No secrets committed
