# Run and Test — Inventory and Supply

## Prerequisites
- Backend running, INVENTORY_MANAGER role seeded
- At least one INVENTORY_MANAGER user exists

## Seed Data

POST /api/inventory/items:
```json
{"name": "Chicken Breast", "unit": "kg", "currentQuantity": 20.000, "reorderLevel": 5.000}
{"name": "Rice", "unit": "kg", "currentQuantity": 50.000, "reorderLevel": 10.000}
```

POST /api/inventory/suppliers:
```json
{"name": "FreshFoods Pvt Ltd", "contactPerson": "John", "phone": "0112345678", "email": "fresh@example.com"}
```

## Manual Tests

### Create Item
```
POST /api/inventory/items
Authorization: Bearer <inventory_manager_token>
{"name": "Tomato", "unit": "kg", "currentQuantity": 30.000, "reorderLevel": 5.000}
```
Expected: 201

### Low Stock Alert
Set currentQuantity to 3 (below reorderLevel 5). Check notifications for INVENTORY_MANAGER user.
Expected: notification with type LOW_STOCK.

### Manual Adjustment
```
POST /api/inventory/items/1/adjust
{"quantityChange": -5.000, "movementType": "WASTE", "note": "Spoilage"}
```
Expected: currentQuantity decreases, StockMovement record created.

### Create Purchase Order
```
POST /api/inventory/purchase-orders
{"supplierId": 1, "notes": "Weekly order", "items": [{"inventoryItemId": 1, "quantityOrdered": 20.000, "unitCost": 450.00}]}
```
Expected: 201, PO number generated.

### Receive Goods
```
PATCH /api/inventory/purchase-orders/1/receive
{"items": [{"purchaseOrderItemId": 1, "quantityReceived": 20.000}]}
```
Expected: inventory item currentQuantity increases by 20, StockMovement IN created.

### Insufficient Stock Rejects Order
Place a food order that requires more ingredient than available.
Expected: 400 with message about insufficient stock.

## Run Tests
```bash
./mvnw test -Dtest="InventoryServiceTest"
```
