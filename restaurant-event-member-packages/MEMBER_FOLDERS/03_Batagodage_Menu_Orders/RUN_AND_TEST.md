# Run and Test — Menu and Orders

## Prerequisites
- Backend running, roles seeded
- At least some inventory items exist (for ingredient linking tests)

## Seed Menu Data via Swagger

1. POST /api/admin/menu/categories — create "Starters", "Main Course", "Desserts"
2. POST /api/admin/menu/items — create at least 3 menu items in different categories
3. Register a CUSTOMER user

## Key Manual Tests

### Create Category (ADMIN)
```
POST /api/admin/menu/categories
{ "name": "Starters", "description": "Appetizers", "displayOrder": 1 }
```
Expected: 201

### Browse Menu (Public)
```
GET /api/menu/items
```
Expected: 200 list of available items

### Place Order (CUSTOMER)
```
POST /api/orders
Authorization: Bearer <customer_token>
{
  "orderType": "DINE_IN",
  "items": [{"menuItemId": 1, "quantity": 2}]
}
```
Expected: 201 with order reference

### Order Unavailable Item
Set isAvailable=false, then try to order that item.
Expected: 400 Bad Request

### Kitchen Updates Status
```
PATCH /api/kitchen/orders/1/status
Authorization: Bearer <kitchen_staff_token>
{ "status": "PREPARING" }
```
Expected: 200, order status changes

### CUSTOMER Cannot Update Status
```
PATCH /api/kitchen/orders/1/status
Authorization: Bearer <customer_token>
```
Expected: 403 Forbidden

## Run Tests
```bash
./mvnw test -Dtest="MenuServiceTest,OrderServiceTest"
```
