# Manual Test Cases — Menu and Orders

## TC-MENU-01: Create Menu Category
Admin POST /api/admin/menu/categories. Expected: 201.

## TC-MENU-02: Create Menu Item
Admin POST /api/admin/menu/items with categoryId. Expected: 201 with item id.

## TC-MENU-03: Browse Menu (Public)
GET /api/menu/items without auth. Expected: 200, only isAvailable=true items.

## TC-MENU-04: Toggle Item Unavailable
Admin PATCH /api/admin/menu/items/{id}/availability. Expected: isAvailable flips.

## TC-ORD-01: Place Order (CUSTOMER)
POST /api/orders with valid items. Expected: 201, status PENDING.

## TC-ORD-02: Order Unavailable Item
Include item with isAvailable=false. Expected: 400 Bad Request.

## TC-ORD-03: Order with Insufficient Stock
Item has ingredients below required quantity. Expected: 400, message mentions insufficient stock.

## TC-ORD-04: Kitchen Gets Orders
GET /api/kitchen/orders as KITCHEN_STAFF. Expected: 200 with active orders.

## TC-ORD-05: Kitchen Updates Status
PATCH /api/kitchen/orders/{id}/status with status PREPARING. Expected: 200.

## TC-ORD-06: Customer Cannot Use Kitchen Endpoint
PATCH /api/kitchen/orders/{id}/status with CUSTOMER token. Expected: 403.

## TC-ORD-07: Stock Deducted After Order
Check inventory_items.current_quantity before and after placing order. Expected: quantity reduced.
