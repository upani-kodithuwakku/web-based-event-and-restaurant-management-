# Database Relationships — Event Booking

## event_halls
| Column | Type |
|--------|------|
| id | BIGINT PK |
| name | VARCHAR(255) NOT NULL |
| capacity | INT |
| location | VARCHAR(255) |
| description | TEXT |
| is_active | BOOLEAN DEFAULT TRUE |

## event_packages
| Column | Type |
|--------|------|
| id | BIGINT PK |
| name | VARCHAR(255) |
| event_type | VARCHAR(100) |
| description | TEXT |
| base_price | DECIMAL(12,2) |
| minimum_guests | INT |
| maximum_guests | INT |
| is_active | BOOLEAN |

## event_bookings
| Column | Type |
|--------|------|
| id | BIGINT PK |
| booking_reference | VARCHAR(50) UNIQUE |
| customer_id | BIGINT FK -> users.id |
| hall_id | BIGINT FK -> event_halls.id |
| package_id | BIGINT FK -> event_packages.id |
| event_date | DATE |
| start_time | TIME |
| end_time | TIME |
| guest_count | INT |
| special_requirements | TEXT |
| status | VARCHAR(50) |
| rejection_reason | TEXT |
| deposit_amount | DECIMAL(12,2) |
| created_at | DATETIME |
| updated_at | DATETIME |

## invoices
| Column | Type |
|--------|------|
| id | BIGINT PK |
| invoice_number | VARCHAR(50) UNIQUE |
| customer_id | BIGINT FK -> users.id |
| food_order_id | BIGINT FK (nullable) |
| event_booking_id | BIGINT FK (nullable) |
| invoice_type | VARCHAR(50) |
| subtotal | DECIMAL(12,2) |
| service_charge | DECIMAL(12,2) |
| tax_amount | DECIMAL(12,2) |
| discount_amount | DECIMAL(12,2) |
| total_amount | DECIMAL(12,2) |
| status | VARCHAR(50) |
| issued_at | DATETIME |

## payments
| Column | Type |
|--------|------|
| id | BIGINT PK |
| payment_reference | VARCHAR(50) UNIQUE |
| invoice_id | BIGINT FK -> invoices.id |
| amount | DECIMAL(12,2) |
| method | VARCHAR(50) |
| status | VARCHAR(50) |
| paid_at | DATETIME |
| gateway_reference | VARCHAR(255) |

## Relationships
- event_bookings many -> one users (customer)
- event_bookings many -> one event_halls
- event_bookings many -> one event_packages
- invoices one -> one event_bookings (nullable, mutually exclusive with food_order)
- invoices one -> many payments
