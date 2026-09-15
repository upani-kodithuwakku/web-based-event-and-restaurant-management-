# Database Schema — Inventory and Supply

## inventory_items
```sql
CREATE TABLE inventory_items (
  id               BIGINT AUTO_INCREMENT PRIMARY KEY,
  name             VARCHAR(255) NOT NULL,
  unit             VARCHAR(50),
  current_quantity DECIMAL(12,3) DEFAULT 0.000,
  reorder_level    DECIMAL(12,3) DEFAULT 0.000,
  is_active        BOOLEAN DEFAULT TRUE
);
```

## suppliers
```sql
CREATE TABLE suppliers (
  id             BIGINT AUTO_INCREMENT PRIMARY KEY,
  name           VARCHAR(255) NOT NULL,
  contact_person VARCHAR(255),
  phone          VARCHAR(50),
  email          VARCHAR(255),
  address        TEXT,
  is_active      BOOLEAN DEFAULT TRUE
);
```

## purchase_orders
```sql
CREATE TABLE purchase_orders (
  id          BIGINT AUTO_INCREMENT PRIMARY KEY,
  po_number   VARCHAR(50) UNIQUE NOT NULL,
  supplier_id BIGINT NOT NULL,
  status      VARCHAR(50) DEFAULT 'DRAFT',
  ordered_at  DATETIME,
  received_at DATETIME,
  notes       TEXT,
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
);
```

## purchase_order_items
```sql
CREATE TABLE purchase_order_items (
  id                 BIGINT AUTO_INCREMENT PRIMARY KEY,
  purchase_order_id  BIGINT NOT NULL,
  inventory_item_id  BIGINT NOT NULL,
  quantity_ordered   DECIMAL(12,3) NOT NULL,
  quantity_received  DECIMAL(12,3) DEFAULT 0.000,
  unit_cost          DECIMAL(12,2),
  FOREIGN KEY (purchase_order_id) REFERENCES purchase_orders(id),
  FOREIGN KEY (inventory_item_id) REFERENCES inventory_items(id)
);
```

## stock_movements
```sql
CREATE TABLE stock_movements (
  id                BIGINT AUTO_INCREMENT PRIMARY KEY,
  inventory_item_id BIGINT NOT NULL,
  movement_type     VARCHAR(50) NOT NULL,
  quantity_change   DECIMAL(12,3) NOT NULL,
  reference_type    VARCHAR(50),
  reference_id      BIGINT,
  note              TEXT,
  created_at        DATETIME,
  FOREIGN KEY (inventory_item_id) REFERENCES inventory_items(id)
);
```
