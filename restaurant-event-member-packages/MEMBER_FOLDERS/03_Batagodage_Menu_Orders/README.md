# Member 03 — Menu and Orders Module

**Member:** Batagodage B.I.
**Module:** Menu and Food Orders
**Roles:** CUSTOMER, KITCHEN_STAFF, ADMIN, MANAGER

## Module Summary

This module manages the complete menu and food ordering workflow:

- Menu category CRUD (display order, active toggle)
- Menu item CRUD (price, image, preparation time, availability toggle)
- Customer menu browsing and cart management
- Place a food order (linked to table/reservation)
- Kitchen order queue management
- Order status workflow: PENDING -> PREPARING -> READY -> SERVED
- Inventory stock deduction on order placement (cross-module integration)
- Low-stock notification trigger (cross-module integration)

## Backend Modules

```
menu/   — MenuCategory, MenuItem entities, service, controllers (public and admin)
orders/ — FoodOrder, FoodOrderItem entities, service, controllers (customer and kitchen)
```

## Frontend Files

```
pages/Menu.tsx             — Customer menu browse, cart, and order placement
pages/admin/Kitchen.tsx    — Kitchen queue with order status update controls
services/api.ts            — menuApi, kitchenApi, orderApi sections
```

## Design Pattern

- **Observer Pattern (optional)** — OrderPlacedEvent can trigger stock deduction and notification creation via Spring application events, decoupling the order service from inventory and notification.

## Key Business Rules

1. A menu item cannot be ordered when `isAvailable = false`.
2. If any required ingredient is below threshold, the order is rejected.
3. Each order item carries a snapshot of the item name and unit price at order time (price changes do not affect past orders).
4. Stock deduction and notification creation are transactional with the order.
5. Only KITCHEN_STAFF, ADMIN, or MANAGER can update order status.
6. Order statuses progress forward only: PENDING -> PREPARING -> READY -> SERVED.
