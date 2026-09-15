# Module Scope — Menu and Orders

## In Scope
- MenuCategory CRUD: /api/admin/menu/categories
- MenuItem CRUD: /api/admin/menu/items
- MenuItem availability toggle: PATCH /api/admin/menu/items/{id}/availability
- Public menu browse: GET /api/menu/categories, GET /api/menu/items
- Place food order: POST /api/orders
- Customer order history: GET /api/orders/my
- Kitchen queue: GET /api/kitchen/orders
- Update order status: PATCH /api/kitchen/orders/{id}/status

## Out of Scope
- Table reservation (Module 04)
- Event booking (Module 02)
- Invoice/payment (Module 02 billing)
- Inventory management UI (Module 05) — inventory deduction is called internally

## Boundary Interfaces
- InventoryService.deductStock() called transactionally on order placement.
- NotificationService.createOrderNotification() called on status changes.
- MenuItemIngredient links MenuItem to InventoryItem (this module owns the recipe side; Module 05 owns inventory items).
