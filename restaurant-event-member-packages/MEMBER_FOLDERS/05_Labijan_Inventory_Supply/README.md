# Member 05 — Inventory and Supply Module

**Member:** Labijan L.
**Module:** Inventory Management and Supply Chain
**Roles:** INVENTORY_MANAGER, ADMIN, MANAGER

## Module Summary

This module manages all physical stock in the restaurant:

- Inventory item CRUD (name, unit, reorder level)
- Current quantity tracking with reorder threshold alerts
- Stock movement history (IN, OUT, ADJUSTMENT, WASTE, TRANSFER)
- Supplier CRUD (contact, phone, email, address)
- Purchase order creation and item management
- Goods receiving workflow (updates current quantities)
- Low-stock detection and notification to INVENTORY_MANAGER
- Ingredient recipe management (MenuItemIngredient)
- Transactional stock deduction when a food order is placed (called by orders module)

## Backend Modules

```
inventory/ — InventoryItem, StockMovement, Supplier, PurchaseOrder, PurchaseOrderItem,
             MenuItemIngredient entities, InventoryService, InventoryController
```

## Frontend Files

```
pages/admin/Inventory.tsx  — Full inventory management UI
services/api.ts            — inventoryApi section
```

## Key Business Rules

1. currentQuantity must never go negative — reject the operation if it would.
2. When currentQuantity falls below reorderLevel after a deduction, create a LOW_STOCK notification for all INVENTORY_MANAGER users.
3. A food order is rejected at placement time if any required ingredient is insufficient.
4. Receiving goods: each PurchaseOrderItem records quantityReceived; InventoryItem.currentQuantity increases.
5. Every quantity change creates a StockMovement record for audit.
6. Use DECIMAL(12,3) for all quantities (allows fractions like 0.500 kg).
