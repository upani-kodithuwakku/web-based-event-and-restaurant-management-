# Frontend Flow — Inventory and Supply

## Inventory.tsx (pages/admin/Inventory.tsx)

This is a tabbed admin page with the following sections:

### Stock Items tab
- Lists all inventory items with current quantity and reorder level.
- Items below reorder level highlighted in red.
- Create/Edit/Deactivate item buttons.
- Manual adjustment modal: quantity change (positive or negative), movement type, note.

### Stock Movements tab
- Select an inventory item to view its movement history.
- Movement types shown with icons: IN (green), OUT (red), ADJUSTMENT (yellow), WASTE (dark red).

### Suppliers tab
- List of active suppliers with contact details.
- Create/Edit/Deactivate supplier.

### Purchase Orders tab
- List of purchase orders by status (DRAFT, SENT, RECEIVED, CANCELLED).
- Create PO: select supplier, add line items (inventory item + quantity + unit cost).
- Receive goods: button on SENT/ORDERED PO opens receive modal.
- Receive modal: enter quantityReceived per line item, submit -> stock updated.

### Low Stock Alerts tab or banner
- Shows items with currentQuantity < reorderLevel.
- Links to supplier list to create a PO.

## API Calls (services/api.ts — inventoryApi)

```typescript
inventoryApi.getItems()                        // GET /api/inventory/items
inventoryApi.createItem(data)                  // POST /api/inventory/items
inventoryApi.updateItem(id, data)              // PUT /api/inventory/items/{id}
inventoryApi.getLowStock()                     // GET /api/inventory/items/low-stock
inventoryApi.adjustStock(id, data)             // POST /api/inventory/items/{id}/adjust
inventoryApi.getMovements(id)                  // GET /api/inventory/items/{id}/movements
inventoryApi.getSuppliers()                    // GET /api/inventory/suppliers
inventoryApi.createSupplier(data)              // POST /api/inventory/suppliers
inventoryApi.getPurchaseOrders()               // GET /api/inventory/purchase-orders
inventoryApi.createPurchaseOrder(data)         // POST /api/inventory/purchase-orders
inventoryApi.receiveGoods(id, data)            // PATCH /api/inventory/purchase-orders/{id}/receive
```
