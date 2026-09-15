# Database Schema — Staff Scheduling

## staff_profiles
```sql
CREATE TABLE staff_profiles (
  id                BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id           BIGINT UNIQUE NOT NULL,
  employee_code     VARCHAR(50) UNIQUE NOT NULL,
  job_title         VARCHAR(255),
  employment_status VARCHAR(50) DEFAULT 'FULL_TIME',
  joined_date       DATE,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## shifts
```sql
CREATE TABLE shifts (
  id                  BIGINT AUTO_INCREMENT PRIMARY KEY,
  shift_date          DATE NOT NULL,
  start_time          TIME NOT NULL,
  end_time            TIME NOT NULL,
  role_required       VARCHAR(50),
  required_staff_count INT DEFAULT 1,
  status              VARCHAR(50) DEFAULT 'SCHEDULED'
);
```

## shift_assignments
```sql
CREATE TABLE shift_assignments (
  id            BIGINT AUTO_INCREMENT PRIMARY KEY,
  shift_id      BIGINT NOT NULL,
  staff_id      BIGINT NOT NULL,
  assigned_role VARCHAR(50),
  status        VARCHAR(50) DEFAULT 'ASSIGNED',
  FOREIGN KEY (shift_id) REFERENCES shifts(id),
  FOREIGN KEY (staff_id) REFERENCES staff_profiles(id)
);
```

## attendance_records
```sql
CREATE TABLE attendance_records (
  id                   BIGINT AUTO_INCREMENT PRIMARY KEY,
  shift_assignment_id  BIGINT UNIQUE NOT NULL,
  check_in_at          DATETIME,
  check_out_at         DATETIME,
  attendance_status    VARCHAR(50),
  FOREIGN KEY (shift_assignment_id) REFERENCES shift_assignments(id)
);
```
