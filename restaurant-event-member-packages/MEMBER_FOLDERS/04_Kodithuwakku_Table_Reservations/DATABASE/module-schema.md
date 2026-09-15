# Database Schema — Table Reservations

## restaurant_tables
```sql
CREATE TABLE restaurant_tables (
  id             BIGINT AUTO_INCREMENT PRIMARY KEY,
  table_number   VARCHAR(50) UNIQUE NOT NULL,
  capacity       INT NOT NULL,
  location       VARCHAR(100),
  current_status VARCHAR(50) NOT NULL DEFAULT 'AVAILABLE',
  is_active      BOOLEAN DEFAULT TRUE,
  created_at     DATETIME,
  updated_at     DATETIME
);
```

## table_reservations
```sql
CREATE TABLE table_reservations (
  id                 BIGINT AUTO_INCREMENT PRIMARY KEY,
  booking_reference  VARCHAR(50) UNIQUE NOT NULL,
  customer_id        BIGINT NOT NULL,
  table_id           BIGINT NOT NULL,
  reservation_date   DATE NOT NULL,
  start_time         TIME NOT NULL,
  end_time           TIME NOT NULL,
  guest_count        INT NOT NULL,
  seating_preference VARCHAR(50),
  special_request    TEXT,
  status             VARCHAR(50) NOT NULL DEFAULT 'PENDING',
  contact_name       VARCHAR(255),
  contact_phone      VARCHAR(50),
  cancel_reason      TEXT,
  created_at         DATETIME,
  updated_at         DATETIME,
  FOREIGN KEY (customer_id) REFERENCES users(id),
  FOREIGN KEY (table_id) REFERENCES restaurant_tables(id)
);
```

## Indexes
```sql
CREATE INDEX idx_reservations_date ON table_reservations (reservation_date);
CREATE INDEX idx_reservations_table_date ON table_reservations (table_id, reservation_date);
CREATE INDEX idx_reservations_customer ON table_reservations (customer_id);
```
