-- Example SQL queries for Table Reservations module

-- 1. Find available tables for a given date/time/guests
SELECT t.id, t.table_number, t.capacity, t.location
FROM restaurant_tables t
WHERE t.is_active = TRUE
  AND t.current_status != 'OUT_OF_SERVICE'
  AND t.capacity >= 4
  AND t.id NOT IN (
    SELECT r.table_id
    FROM table_reservations r
    WHERE r.reservation_date = '2026-09-20'
      AND r.status IN ('PENDING', 'CONFIRMED', 'CHECKED_IN')
      AND NOT (r.end_time <= '19:00' OR r.start_time >= '21:00')
  );

-- 2. Check overlap for a specific table (before insert)
SELECT COUNT(*) FROM table_reservations
WHERE table_id = 3
  AND reservation_date = '2026-09-20'
  AND status IN ('PENDING', 'CONFIRMED', 'CHECKED_IN')
  AND NOT (end_time <= '19:00' OR start_time >= '21:00');

-- 3. Daily reservation calendar for staff
SELECT t.table_number, u.full_name AS customer, tr.booking_reference,
       tr.start_time, tr.end_time, tr.guest_count, tr.status
FROM table_reservations tr
JOIN restaurant_tables t ON t.id = tr.table_id
JOIN users u ON u.id = tr.customer_id
WHERE tr.reservation_date = '2026-09-20'
ORDER BY tr.start_time, t.table_number;

-- 4. Check-in: update reservation and table
UPDATE table_reservations SET status = 'CHECKED_IN', updated_at = NOW() WHERE id = 5;
UPDATE restaurant_tables SET current_status = 'OCCUPIED', updated_at = NOW() WHERE id = 3;

-- 5. Complete: update reservation and release table
UPDATE table_reservations SET status = 'COMPLETED', updated_at = NOW() WHERE id = 5;
UPDATE restaurant_tables SET current_status = 'AVAILABLE', updated_at = NOW() WHERE id = 3;

-- 6. No-show: mark reservation and release table
UPDATE table_reservations SET status = 'NO_SHOW', updated_at = NOW() WHERE id = 6;
UPDATE restaurant_tables SET current_status = 'AVAILABLE', updated_at = NOW() WHERE id = 4;

-- 7. Cancel a reservation
UPDATE table_reservations SET status = 'CANCELLED', cancel_reason = 'Customer request', updated_at = NOW() WHERE id = 7;

-- 8. Customer's own reservations
SELECT tr.booking_reference, t.table_number, tr.reservation_date,
       tr.start_time, tr.end_time, tr.guest_count, tr.status
FROM table_reservations tr
JOIN restaurant_tables t ON t.id = tr.table_id
WHERE tr.customer_id = 4
ORDER BY tr.reservation_date DESC;
