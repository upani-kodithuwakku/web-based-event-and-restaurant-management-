# Entities — Staff Scheduling

## StaffProfile
Package: `com.group06.restaurantevent.staff.entity`
Fields: id, user (OneToOne User), employeeCode, jobTitle, employmentStatus (EmploymentStatus), joinedDate

## Shift
Package: `com.group06.restaurantevent.staff.entity`
Fields: id, shiftDate, startTime, endTime, roleRequired, requiredStaffCount, status (ShiftStatus), assignments (OneToMany ShiftAssignment)

## ShiftAssignment
Package: `com.group06.restaurantevent.staff.entity`
Fields: id, shift (ManyToOne Shift), staff (ManyToOne StaffProfile), assignedRole, status

## AttendanceRecord
Package: `com.group06.restaurantevent.staff.entity`
Fields: id, shiftAssignment (OneToOne ShiftAssignment), checkInAt, checkOutAt, attendanceStatus
