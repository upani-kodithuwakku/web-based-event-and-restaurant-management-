# Relationships — Table Reservations

- table_reservations many-to-one users (customer_id)
- table_reservations many-to-one restaurant_tables (table_id)
- restaurant_tables is referenced by food_orders.table_id (Module 03)
- table_reservations is referenced by food_orders.reservation_id (Module 03)

## Critical: Overlap Prevention

A time slot is blocked when an existing reservation for the same table on the same date has status IN ('PENDING', 'CONFIRMED', 'CHECKED_IN') and the time ranges overlap.

Time ranges overlap when: NOT (existing.end_time <= new.start_time OR existing.start_time >= new.end_time)

## Table Status Transitions

AVAILABLE -> RESERVED (when confirmed reservation exists)
AVAILABLE -> OUT_OF_SERVICE (admin action)
RESERVED -> OCCUPIED (on check-in)
OCCUPIED -> AVAILABLE (on complete or no-show)
OUT_OF_SERVICE -> AVAILABLE (admin action to restore)
