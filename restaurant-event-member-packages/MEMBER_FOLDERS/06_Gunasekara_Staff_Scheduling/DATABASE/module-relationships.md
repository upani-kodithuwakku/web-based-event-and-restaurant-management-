# Relationships — Staff Scheduling

- staff_profiles one-to-one users (user_id UNIQUE)
- shift_assignments many-to-one shifts
- shift_assignments many-to-one staff_profiles
- attendance_records one-to-one shift_assignments

## Understaffed Calculation

```sql
SELECT s.id, s.required_staff_count,
       COUNT(sa.id) AS assigned_count,
       CASE WHEN COUNT(sa.id) < s.required_staff_count THEN TRUE ELSE FALSE END AS understaffed
FROM shifts s
LEFT JOIN shift_assignments sa ON sa.shift_id = s.id AND sa.status != 'CANCELLED'
WHERE s.shift_date = '2026-09-20'
GROUP BY s.id;
```

## Conflict Check

```sql
SELECT COUNT(*) FROM shift_assignments sa
JOIN shifts s ON s.id = sa.shift_id
WHERE sa.staff_id = :staffId
  AND s.shift_date = :date
  AND sa.status != 'CANCELLED'
  AND NOT (s.end_time <= :newStartTime OR s.start_time >= :newEndTime)
```
