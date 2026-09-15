# Database Relationships — Table Reservations

## restaurant_tables
| Column | Type | Notes |
|--------|------|-------|
| id | BIGINT PK | |
| table_number | VARCHAR(50) UNIQUE | e.g. T01 |
| capacity | INT NOT NULL | |
| location | VARCHAR(100) | WINDOW, INDOOR, OUTDOOR, PRIVATE |
| current_status | VARCHAR(50) | TableStatus enum |
| is_active | BOOLEAN DEFAULT TRUE | |
| created_at | DATETIME | |
| updated_at | DATETIME | |

## table_reservations
| Column | Type | Notes |
|--------|------|-------|
| id | BIGINT PK | |
| booking_reference | VARCHAR(50) UNIQUE | RES-YYYYMMDD-XXXX |
| customer_id | BIGINT FK -> users.id | |
| table_id | BIGINT FK -> restaurant_tables.id | |
| reservation_date | DATE NOT NULL | |
| start_time | TIME NOT NULL | |
| end_time | TIME NOT NULL | derived: startTime + 120 min default |
| guest_count | INT NOT NULL | |
| seating_preference | VARCHAR(50) | optional |
| special_request | TEXT | |
| status | VARCHAR(50) | ReservationStatus enum |
| contact_name | VARCHAR(255) | |
| contact_phone | VARCHAR(50) | |
| cancel_reason | TEXT | |
| created_at | DATETIME | |
| updated_at | DATETIME | |

## Relationships

- table_reservations many-to-one users (customer_id)
- table_reservations many-to-one restaurant_tables (table_id)
- restaurant_tables is referenced by food_orders.table_id (cross-module)

## Key Constraint

Overlap detection query logic:
```sql
SELECT COUNT(*) FROM table_reservations
WHERE table_id = :tableId
  AND reservation_date = :date
  AND status IN ('PENDING', 'CONFIRMED', 'CHECKED_IN')
  AND NOT (end_time <= :startTime OR start_time >= :endTime)
```
