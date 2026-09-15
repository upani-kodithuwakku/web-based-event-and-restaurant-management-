-- Example SQL queries for Event Booking module

-- 1. Check hall availability (no overlapping PENDING/APPROVED bookings)
SELECT COUNT(*) FROM event_bookings
WHERE hall_id = 1
  AND event_date = '2026-12-25'
  AND status IN ('PENDING', 'APPROVED')
  AND NOT (end_time <= '18:00' OR start_time >= '23:00');

-- 2. List all pending bookings for coordinator
SELECT eb.id, eb.booking_reference, u.full_name, h.name AS hall,
       eb.event_date, eb.start_time, eb.end_time, eb.guest_count, eb.status
FROM event_bookings eb
JOIN users u ON u.id = eb.customer_id
JOIN event_halls h ON h.id = eb.hall_id
WHERE eb.status = 'PENDING'
ORDER BY eb.event_date, eb.start_time;

-- 3. Approve a booking
UPDATE event_bookings SET status = 'APPROVED', updated_at = NOW() WHERE id = 5;

-- 4. Reject a booking
UPDATE event_bookings SET status = 'REJECTED', rejection_reason = 'Hall unavailable', updated_at = NOW() WHERE id = 6;

-- 5. Event calendar for a month
SELECT eb.event_date, h.name AS hall, ep.name AS package,
       eb.start_time, eb.end_time, eb.guest_count, eb.status
FROM event_bookings eb
JOIN event_halls h ON h.id = eb.hall_id
JOIN event_packages ep ON ep.id = eb.package_id
WHERE eb.event_date BETWEEN '2026-12-01' AND '2026-12-31'
  AND eb.status IN ('APPROVED', 'PENDING')
ORDER BY eb.event_date, eb.start_time;

-- 6. Create invoice for event booking
INSERT INTO invoices (invoice_number, customer_id, event_booking_id, invoice_type, subtotal, service_charge, tax_amount, discount_amount, total_amount, status, issued_at)
VALUES ('INV-2026001', 3, 5, 'EVENT', 50000.00, 5000.00, 4500.00, 0.00, 59500.00, 'PENDING', NOW());

-- 7. Record payment
INSERT INTO payments (payment_reference, invoice_id, amount, method, status, paid_at)
VALUES ('PAY-2026001', 1, 59500.00, 'CASH', 'PAID', NOW());

-- 8. Update invoice to PAID after full payment
UPDATE invoices SET status = 'PAID' WHERE id = 1;
