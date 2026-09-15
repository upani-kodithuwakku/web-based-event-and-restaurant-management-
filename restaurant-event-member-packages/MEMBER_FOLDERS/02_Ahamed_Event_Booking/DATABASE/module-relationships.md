# Relationships — Event Booking

- event_bookings many-to-one users (customer_id)
- event_bookings many-to-one event_halls (hall_id)
- event_bookings many-to-one event_packages (package_id)
- invoices many-to-one users (customer_id)
- invoices many-to-one event_bookings (event_booking_id, nullable)
- invoices many-to-one food_orders (food_order_id, nullable — owned by Module 03)
- invoice_items many-to-one invoices
- payments many-to-one invoices

An invoice is linked to EITHER an event booking OR a food order, never both. The invoice_type field distinguishes EVENT from FOOD_ORDER.
