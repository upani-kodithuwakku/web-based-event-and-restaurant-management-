# Database Relationships — Inventory and Supply

## inventory_items
| Column | Type |
|--------|------|
| id | BIGINT PK |
| name | VARCHAR(255) NOT NULL |
| unit | VARCHAR(50) |
| current_quantity | DECIMAL(12,3) DEFAULT 0 |
| reorder_level | DECIMAL(12,3) DEFAULT 0 |
| is_active | BOOLEAN DEFAULT TRUE |

## suppliers
| Column | Type |
|--------|------|
| id | BIGINT PK |
| name | VARCHAR(255) NOT NULL |
| contact_person | VARCHAR(255) |
| phone | VARCHAR(50) |
| email | VARCHAR(255) |
| address | TEXT |
| is_active | BOOLEAN DEFAULT TRUE |

## purchase_orders
| Column | Type |
|--------|------|
| id | BIGINT PK |
| po_number | VARCHAR(50) UNIQUE |
| supplier_id | BIGINT FK -> suppliers.id |
| status | VARCHAR(50) |
| ordered_at | DATETIME |
| received_at | DATETIME |
| notes | TEXT |

## purchase_order_items
| Column | Type |
|--------|------|
| id | BIGINT PK |
| purchase_order_id | BIGINT FK -> purchase_orders.id |
| inventory_item_id | BIGINT FK -> inventory_items.id |
| quantity_ordered | DECIMAL(12,3) |
| quantity_received | DECIMAL(12,3) |
| unit_cost | DECIMAL(12,2) |

## stock_movements
| Column | Type |
|--------|------|
| id | BIGINT PK |
| inventory_item_id | BIGINT FK -> inventory_items.id |
| movement_type | VARCHAR(50) |
| quantity_change | DECIMAL(12,3) |
| reference_type | VARCHAR(50) |
| reference_id | BIGINT |
| note | TEXT |
| created_at | DATETIME |

## menu_item_ingredients
| Column | Type |
|--------|------|
| id | BIGINT PK |
| menu_item_id | BIGINT FK -> menu_items.id |
| inventory_item_id | BIGINT FK -> inventory_items.id |
| quantity_required | DECIMAL(12,3) |

## Relationships
- purchase_orders many-to-one suppliers
- purchase_order_items many-to-one purchase_orders
- purchase_order_items many-to-one inventory_items
- stock_movements many-to-one inventory_items
- menu_item_ingredients many-to-one inventory_items
- menu_item_ingredients many-to-one menu_items (cross-module)
