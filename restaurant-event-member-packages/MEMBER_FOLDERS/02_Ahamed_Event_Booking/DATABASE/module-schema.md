# Database Schema — Event Booking

## event_halls
```sql
CREATE TABLE event_halls (
  id          BIGINT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  capacity    INT NOT NULL,
  location    VARCHAR(255),
  description TEXT,
  is_active   BOOLEAN DEFAULT TRUE
);
```

## event_packages
```sql
CREATE TABLE event_packages (
  id             BIGINT AUTO_INCREMENT PRIMARY KEY,
  name           VARCHAR(255) NOT NULL,
  event_type     VARCHAR(100),
  description    TEXT,
  base_price     DECIMAL(12,2) NOT NULL,
  minimum_guests INT,
  maximum_guests INT,
  is_active      BOOLEAN DEFAULT TRUE
);
```

## event_bookings
```sql
CREATE TABLE event_bookings (
  id                   BIGINT AUTO_INCREMENT PRIMARY KEY,
  booking_reference    VARCHAR(50) UNIQUE NOT NULL,
  customer_id          BIGINT NOT NULL,
  hall_id              BIGINT NOT NULL,
  package_id           BIGINT NOT NULL,
  event_date           DATE NOT NULL,
  start_time           TIME NOT NULL,
  end_time             TIME NOT NULL,
  guest_count          INT NOT NULL,
  special_requirements TEXT,
  status               VARCHAR(50) NOT NULL DEFAULT 'PENDING',
  rejection_reason     TEXT,
  deposit_amount       DECIMAL(12,2),
  created_at           DATETIME,
  updated_at           DATETIME,
  FOREIGN KEY (customer_id) REFERENCES users(id),
  FOREIGN KEY (hall_id) REFERENCES event_halls(id),
  FOREIGN KEY (package_id) REFERENCES event_packages(id)
);
```

## invoices
```sql
CREATE TABLE invoices (
  id                BIGINT AUTO_INCREMENT PRIMARY KEY,
  invoice_number    VARCHAR(50) UNIQUE NOT NULL,
  customer_id       BIGINT NOT NULL,
  food_order_id     BIGINT,
  event_booking_id  BIGINT,
  invoice_type      VARCHAR(50),
  subtotal          DECIMAL(12,2),
  service_charge    DECIMAL(12,2),
  tax_amount        DECIMAL(12,2),
  discount_amount   DECIMAL(12,2),
  total_amount      DECIMAL(12,2),
  status            VARCHAR(50) DEFAULT 'PENDING',
  issued_at         DATETIME,
  FOREIGN KEY (customer_id) REFERENCES users(id),
  FOREIGN KEY (food_order_id) REFERENCES food_orders(id),
  FOREIGN KEY (event_booking_id) REFERENCES event_bookings(id)
);
```

## payments
```sql
CREATE TABLE payments (
  id                BIGINT AUTO_INCREMENT PRIMARY KEY,
  payment_reference VARCHAR(50) UNIQUE NOT NULL,
  invoice_id        BIGINT NOT NULL,
  amount            DECIMAL(12,2) NOT NULL,
  method            VARCHAR(50) NOT NULL,
  status            VARCHAR(50) DEFAULT 'PENDING',
  paid_at           DATETIME,
  gateway_reference VARCHAR(255),
  FOREIGN KEY (invoice_id) REFERENCES invoices(id)
);
```
