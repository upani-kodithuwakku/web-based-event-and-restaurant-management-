# Manual Test Cases — Inventory and Supply

## TC-INV-01: Create Inventory Item
POST /api/inventory/items as INVENTORY_MANAGER. Expected: 201.

## TC-INV-02: List Low-Stock Items
GET /api/inventory/items/low-stock. Expected: items with currentQuantity < reorderLevel.

## TC-INV-03: Manual Adjustment (Decrease)
POST /api/inventory/items/{id}/adjust with negative quantityChange.
Expected: currentQuantity decreases, StockMovement OUT created.

## TC-INV-04: Adjustment Below Zero
Adjust with quantityChange that would make currentQuantity negative.
Expected: 400 Bad Request.

## TC-INV-05: Create Supplier
POST /api/inventory/suppliers. Expected: 201.

## TC-INV-06: Create Purchase Order
POST /api/inventory/purchase-orders with supplier and items. Expected: 201 with PO number.

## TC-INV-07: Receive Goods
PATCH /api/inventory/purchase-orders/{id}/receive with quantities received.
Expected: inventory quantities increased, PO status RECEIVED.

## TC-INV-08: Low Stock Notification
Adjust stock to below reorderLevel. GET /api/notifications as INVENTORY_MANAGER.
Expected: LOW_STOCK notification present.

## TC-INV-09: Insufficient Stock Rejects Food Order
Set ingredient quantity to 0. Attempt to place a food order requiring that ingredient.
Expected: 400 with insufficient stock message.

## TC-INV-10: Stock Movement History
GET /api/inventory/items/{id}/movements. Expected: ordered list of movements.

## TC-INV-11: CUSTOMER Cannot Access Inventory
GET /api/inventory/items with CUSTOMER JWT. Expected: 403 Forbidden.
