# API Endpoints — Inventory and Supply

Base URL: http://localhost:8080/api

## Inventory Item Endpoints (INVENTORY_MANAGER, ADMIN, MANAGER)

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/inventory/items | List all items |
| POST | /api/inventory/items | Create item |
| GET | /api/inventory/items/{id} | Get item detail |
| PUT | /api/inventory/items/{id} | Update item |
| DELETE | /api/inventory/items/{id} | Deactivate item |
| GET | /api/inventory/items/low-stock | Items below reorder level |
| POST | /api/inventory/items/{id}/adjust | Manual stock adjustment |
| GET | /api/inventory/items/{id}/movements | Stock movement history |

## Supplier Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/inventory/suppliers | List active suppliers |
| POST | /api/inventory/suppliers | Create supplier |
| PUT | /api/inventory/suppliers/{id} | Update supplier |
| DELETE | /api/inventory/suppliers/{id} | Deactivate supplier |

## Purchase Order Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/inventory/purchase-orders | List purchase orders |
| POST | /api/inventory/purchase-orders | Create purchase order |
| GET | /api/inventory/purchase-orders/{id} | PO detail with items |
| PATCH | /api/inventory/purchase-orders/{id}/receive | Receive goods (updates quantities) |
| PATCH | /api/inventory/purchase-orders/{id}/cancel | Cancel PO |

## Ingredient Recipe Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/inventory/menu-items/{menuItemId}/ingredients | List ingredients |
| POST | /api/inventory/menu-items/{menuItemId}/ingredients | Add ingredient |
| DELETE | /api/inventory/menu-items/{menuItemId}/ingredients/{id} | Remove ingredient |

## Sample Inventory Item Create

```json
{
  "name": "Chicken Breast",
  "unit": "kg",
  "currentQuantity": 20.000,
  "reorderLevel": 5.000
}
```

## Sample Stock Adjustment

```json
{
  "quantityChange": -2.500,
  "movementType": "ADJUSTMENT",
  "note": "Waste from spoilage"
}
```

## Sample Purchase Order

```json
{
  "supplierId": 2,
  "notes": "Weekly fresh produce order",
  "items": [
    {"inventoryItemId": 3, "quantityOrdered": 50.000, "unitCost": 450.00},
    {"inventoryItemId": 5, "quantityOrdered": 20.000, "unitCost": 120.00}
  ]
}
```
