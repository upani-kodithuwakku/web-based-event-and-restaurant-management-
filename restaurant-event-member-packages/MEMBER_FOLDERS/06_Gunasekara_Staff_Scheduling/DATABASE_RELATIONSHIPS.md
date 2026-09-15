# Database Relationships — Staff Scheduling

## staff_profiles
| Column | Type |
|--------|------|
| id | BIGINT PK |
| user_id | BIGINT FK -> users.id UNIQUE |
| employee_code | VARCHAR(50) UNIQUE |
| job_title | VARCHAR(255) |
| employment_status | VARCHAR(50) |
| joined_date | DATE |

## shifts
| Column | Type |
|--------|------|
| id | BIGINT PK |
| shift_date | DATE NOT NULL |
| start_time | TIME NOT NULL |
| end_time | TIME NOT NULL |
| role_required | VARCHAR(50) |
| required_staff_count | INT DEFAULT 1 |
| status | VARCHAR(50) DEFAULT 'SCHEDULED' |

## shift_assignments
| Column | Type |
|--------|------|
| id | BIGINT PK |
| shift_id | BIGINT FK -> shifts.id |
| staff_id | BIGINT FK -> staff_profiles.id |
| assigned_role | VARCHAR(50) |
| status | VARCHAR(50) DEFAULT 'ASSIGNED' |

## attendance_records
| Column | Type |
|--------|------|
| id | BIGINT PK |
| shift_assignment_id | BIGINT FK -> shift_assignments.id |
| check_in_at | DATETIME |
| check_out_at | DATETIME |
| attendance_status | VARCHAR(50) |

## Relationships

- staff_profiles one-to-one users (user_id UNIQUE)
- shift_assignments many-to-one shifts
- shift_assignments many-to-one staff_profiles
- attendance_records one-to-one shift_assignments

## Conflict Prevention Query

A staff member cannot be assigned to two overlapping shifts on the same date:
```sql
SELECT COUNT(*) FROM shift_assignments sa
JOIN shifts s ON s.id = sa.shift_id
WHERE sa.staff_id = :staffId
  AND s.shift_date = :shiftDate
  AND sa.status != 'CANCELLED'
  AND NOT (s.end_time <= :newStart OR s.start_time >= :newEnd)
```
