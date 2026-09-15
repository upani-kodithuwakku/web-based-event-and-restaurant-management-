# Frontend Flow — Menu and Orders

## Customer Menu Flow (pages/Menu.tsx)

1. Loads menu categories via menuApi.getCategories().
2. Loads menu items, grouped by category.
3. Customer clicks category tabs to filter items.
4. Unavailable items are shown as greyed out with "Out of stock" badge.
5. Add to cart button stores items in local cart state.
6. Cart summary shows count, subtotal.
7. Place order button calls orderApi.placeOrder() with cart items, tableId, orderType.
8. On success, order reference displayed. Cart cleared.

## Kitchen Flow (pages/admin/Kitchen.tsx)

1. Loads all active orders via kitchenApi.getOrders() (PENDING, PREPARING, READY).
2. Orders displayed as cards with item list.
3. Status action buttons: "Start Preparing", "Mark Ready", "Mark Served".
4. Each action calls kitchenApi.updateStatus(orderId, newStatus).
5. Page auto-refreshes or uses polling to show new incoming orders.

## API Calls (services/api.ts)

```typescript
menuApi.getCategories()           // GET /api/menu/categories
menuApi.getItems()                // GET /api/menu/items
menuApi.toggleAvailability(id)    // PATCH /api/admin/menu/items/{id}/availability
orderApi.placeOrder(data)         // POST /api/orders
orderApi.getMyOrders()            // GET /api/orders/my
kitchenApi.getOrders()            // GET /api/kitchen/orders
kitchenApi.updateStatus(id, status)  // PATCH /api/kitchen/orders/{id}/status
```
