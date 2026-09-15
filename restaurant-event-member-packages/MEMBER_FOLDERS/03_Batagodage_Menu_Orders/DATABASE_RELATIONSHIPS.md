# Database Relationships — Menu and Orders

## menu_categories
| Column | Type |
|--------|------|
| id | BIGINT PK |
| name | VARCHAR(255) |
| description | TEXT |
| display_order | INT |
| is_active | BOOLEAN |

## menu_items
| Column | Type |
|--------|------|
| id | BIGINT PK |
| category_id | BIGINT FK -> menu_categories.id |
| name | VARCHAR(255) |
| description | TEXT |
| price | DECIMAL(12,2) |
| image_url | VARCHAR(500) |
| preparation_minutes | INT |
| is_available | BOOLEAN |
| is_active | BOOLEAN |

## food_orders
| Column | Type |
|--------|------|
| id | BIGINT PK |
| order_reference | VARCHAR(50) UNIQUE |
| customer_id | BIGINT FK -> users.id |
| table_id | BIGINT FK (nullable) -> restaurant_tables.id |
| reservation_id | BIGINT FK (nullable) -> table_reservations.id |
| order_type | VARCHAR(50) |
| status | VARCHAR(50) |
| special_note | TEXT |
| subtotal | DECIMAL(12,2) |
| created_at | DATETIME |
| updated_at | DATETIME |

## food_order_items
| Column | Type |
|--------|------|
| id | BIGINT PK |
| order_id | BIGINT FK -> food_orders.id |
| menu_item_id | BIGINT FK -> menu_items.id |
| item_name_snapshot | VARCHAR(255) |
| unit_price_snapshot | DECIMAL(12,2) |
| quantity | INT |
| special_note | TEXT |
| line_total | DECIMAL(12,2) |

## menu_item_ingredients (cross-module — reads inventory_items)
| Column | Type |
|--------|------|
| id | BIGINT PK |
| menu_item_id | BIGINT FK -> menu_items.id |
| inventory_item_id | BIGINT FK -> inventory_items.id |
| quantity_required | DECIMAL(12,3) |

## Relationships
- menu_items many-to-one menu_categories
- food_orders many-to-one users (customer)
- food_order_items many-to-one food_orders
- food_order_items many-to-one menu_items (snapshot copied at order time)
- menu_item_ingredients many-to-one menu_items
- menu_item_ingredients many-to-one inventory_items (owned by Module 05)
