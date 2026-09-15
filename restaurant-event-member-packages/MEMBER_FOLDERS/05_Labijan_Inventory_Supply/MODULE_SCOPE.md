# Module Scope — Inventory and Supply

## In Scope
- InventoryItem CRUD: /api/inventory/items
- Stock movement history: GET /api/inventory/items/{id}/movements
- Manual stock adjustment: POST /api/inventory/items/{id}/adjust
- Low-stock items list: GET /api/inventory/items/low-stock
- Supplier CRUD: /api/inventory/suppliers
- Purchase order CRUD: /api/inventory/purchase-orders
- Receive goods: PATCH /api/inventory/purchase-orders/{id}/receive
- MenuItemIngredient management: /api/inventory/menu-items/{menuItemId}/ingredients

## Out of Scope
- Actual food ordering (Module 03)
- Event booking (Module 02)
- Staff scheduling (Module 06)
- Billing and payments (Module 02)

## Boundary Interfaces
- InventoryService.checkAndDeductStock(orderItems) called by OrderService @Transactional when a food order is placed (Module 03 calls this).
- NotificationService.createLowStockNotification() called when currentQuantity < reorderLevel after deduction.
- MenuItemIngredient is the bridge between menu items (Module 03) and inventory items (this module).
