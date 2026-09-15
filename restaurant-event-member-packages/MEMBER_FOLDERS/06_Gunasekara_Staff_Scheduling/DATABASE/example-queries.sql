-- Example SQL queries for Staff Scheduling module

-- 1. Check for scheduling conflict before assignment
SELECT COUNT(*) FROM shift_assignments sa
JOIN shifts s ON s.id = sa.shift_id
WHERE sa.staff_id = 3
  AND s.shift_date = '2026-09-20'
  AND sa.status != 'CANCELLED'
  AND NOT (s.end_time <= '08:00' OR s.start_time >= '16:00');

-- 2. Weekly schedule for all staff
SELECT s.shift_date, s.start_time, s.end_time, s.role_required,
       sp.employee_code, u.full_name
FROM shifts s
JOIN shift_assignments sa ON sa.shift_id = s.id
JOIN staff_profiles sp ON sp.id = sa.staff_id
JOIN users u ON u.id = sp.user_id
WHERE s.shift_date BETWEEN '2026-09-20' AND '2026-09-26'
  AND sa.status != 'CANCELLED'
ORDER BY s.shift_date, s.start_time;

-- 3. Understaffed shifts
SELECT s.id, s.shift_date, s.start_time, s.end_time,
       s.required_staff_count,
       COUNT(sa.id) AS assigned_count
FROM shifts s
LEFT JOIN shift_assignments sa ON sa.shift_id = s.id AND sa.status != 'CANCELLED'
WHERE s.shift_date >= CURDATE() AND s.status = 'SCHEDULED'
GROUP BY s.id
HAVING COUNT(sa.id) < s.required_staff_count;

-- 4. Record check-in
INSERT INTO attendance_records (shift_assignment_id, check_in_at, attendance_status)
VALUES (7, '2026-09-20 08:03:00', 'PRESENT');

-- 5. Update check-out
UPDATE attendance_records
SET check_out_at = '2026-09-20 16:10:00'
WHERE shift_assignment_id = 7;

-- 6. Attendance summary for a date
SELECT u.full_name, sp.employee_code, s.start_time, s.end_time,
       ar.check_in_at, ar.check_out_at, ar.attendance_status
FROM attendance_records ar
JOIN shift_assignments sa ON sa.id = ar.shift_assignment_id
JOIN shifts s ON s.id = sa.shift_id
JOIN staff_profiles sp ON sp.id = sa.staff_id
JOIN users u ON u.id = sp.user_id
WHERE s.shift_date = '2026-09-20'
ORDER BY s.start_time;

-- 7. Staff with TERMINATED status (should not be assigned)
SELECT sp.id, u.full_name, sp.employee_code, sp.employment_status
FROM staff_profiles sp
JOIN users u ON u.id = sp.user_id
WHERE sp.employment_status = 'TERMINATED';
