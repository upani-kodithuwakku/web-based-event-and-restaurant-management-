# API Endpoints — Menu and Orders

## Public Menu Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | /api/menu/categories | Any | List active categories |
| GET | /api/menu/items | Any | List available menu items |
| GET | /api/menu/items/{id} | Any | Get menu item detail |
| GET | /api/menu/categories/{id}/items | Any | Items in a category |

## Admin Menu Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /api/admin/menu/categories | ADMIN/MANAGER | Create category |
| PUT | /api/admin/menu/categories/{id} | ADMIN/MANAGER | Update category |
| DELETE | /api/admin/menu/categories/{id} | ADMIN/MANAGER | Deactivate category |
| POST | /api/admin/menu/items | ADMIN/MANAGER | Create menu item |
| PUT | /api/admin/menu/items/{id} | ADMIN/MANAGER | Update menu item |
| DELETE | /api/admin/menu/items/{id} | ADMIN/MANAGER | Deactivate menu item |
| PATCH | /api/admin/menu/items/{id}/availability | ADMIN/MANAGER | Toggle availability |

## Order Endpoints (Customer)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /api/orders | CUSTOMER | Place food order |
| GET | /api/orders/my | CUSTOMER | Customer's orders |
| GET | /api/orders/{id} | CUSTOMER | Order detail |

## Kitchen Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | /api/kitchen/orders | KITCHEN_STAFF/ADMIN | Kitchen queue |
| PATCH | /api/kitchen/orders/{id}/status | KITCHEN_STAFF/ADMIN | Update order status |

## Sample Order Request

```json
{
  "tableId": 3,
  "reservationId": 12,
  "orderType": "DINE_IN",
  "specialNote": "No onions please",
  "items": [
    {"menuItemId": 5, "quantity": 2, "specialNote": "Extra spicy"},
    {"menuItemId": 8, "quantity": 1, "specialNote": ""}
  ]
}
```

## Sample Status Update

```json
{
  "status": "PREPARING"
}
```

OrderStatus transitions: PENDING -> PREPARING -> READY -> SERVED
