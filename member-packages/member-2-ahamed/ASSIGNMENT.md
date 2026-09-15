# Member 2 — Your Assignment
## Ahamed M.I.I.
**Module: Menu Management & Food Orders**
**Branch: `feature/menu-orders`**

---

## Your Git Setup (do this first)

```bash
git clone <your-team-repo-url>
cd web-based-event-and-restaurant-management-
git checkout develop
git pull origin develop
git checkout -b feature/menu-orders
```

---

## Run the Project Locally

### Backend
```bash
cd restaurant-event-backend
cp .env.example .env   # fill in your MySQL password
mvn spring-boot:run
```
Backend: http://localhost:8080  |  Swagger: http://localhost:8080/swagger-ui.html

### Frontend
```bash
cd restaurant-event-frontend && npm install && npm run dev
```
Frontend: http://localhost:5173  →  click "Our menu" in the nav

---

## Your Backend Files (empty skeleton — YOU implement everything)

```
restaurant-event-backend/src/main/java/com/group06/restaurantevent/
├── menu/
│   ├── entity/
│   │   ├── MenuCategory.java      ← id, name, description, displayOrder, isActive
│   │   └── MenuItem.java          ← id, categoryId, name, price, imageUrl, preparationMinutes, isAvailable, isActive
│   ├── dto/request/
│   │   ├── CreateCategoryRequest.java
│   │   ├── CreateMenuItemRequest.java
│   │   └── UpdateMenuItemRequest.java
│   ├── dto/response/
│   │   ├── CategoryResponse.java
│   │   └── MenuItemResponse.java
│   ├── repository/
│   │   ├── MenuCategoryRepository.java
│   │   └── MenuItemRepository.java
│   ├── service/
│   │   └── MenuService.java        ← list, create, update, toggle availability
│   ├── controller/
│   │   ├── MenuController.java     ← public menu listing
│   │   └── AdminMenuController.java← admin CRUD
│   └── mapper/
│       └── MenuMapper.java
└── orders/
    ├── entity/
    │   ├── FoodOrder.java          ← id, orderReference, customerId, tableId, status, subtotal, createdAt
    │   └── FoodOrderItem.java      ← id, orderId, menuItemId, itemNameSnapshot, unitPriceSnapshot, quantity, lineTotal
    ├── dto/request/
    │   ├── CreateOrderRequest.java
    │   └── UpdateOrderStatusRequest.java
    ├── dto/response/
    │   ├── OrderResponse.java
    │   └── OrderItemResponse.java
    ├── repository/
    │   ├── FoodOrderRepository.java
    │   └── FoodOrderItemRepository.java
    ├── service/
    │   └── OrderService.java       ← create, list, update status
    ├── controller/
    │   ├── OrderController.java    ← customer order endpoints
    │   └── KitchenController.java  ← kitchen queue endpoints
    └── mapper/
        └── OrderMapper.java
```

---

## Business Rules You Must Enforce

1. A `MenuItem` with `isAvailable = false` CANNOT be ordered — return 409.
2. Quantity must be >= 1 per item.
3. Save `itemNameSnapshot` and `unitPriceSnapshot` when order is created — the actual menu price may change later.
4. `subtotal` = sum of (unitPriceSnapshot × quantity) for all items.
5. Order status flow:
   ```
   PENDING → PREPARING → READY → SERVED → COMPLETED
                               ↘ CANCELLED
   ```
6. Only KITCHEN_STAFF can update order status via kitchen endpoints.
7. Customer can only view their own orders.

---

## Endpoints to Implement

```
# Public / Customer
GET    /api/menu/categories
GET    /api/menu/items
GET    /api/menu/items?categoryId=1
GET    /api/menu/items/{id}

POST   /api/orders
GET    /api/orders/my
GET    /api/orders/{id}

# Kitchen staff
GET    /api/kitchen/orders
PATCH  /api/kitchen/orders/{id}/status

# Admin
POST   /api/admin/menu/categories
PUT    /api/admin/menu/categories/{id}
DELETE /api/admin/menu/categories/{id}
POST   /api/admin/menu/items
PUT    /api/admin/menu/items/{id}
PATCH  /api/admin/menu/items/{id}/availability
DELETE /api/admin/menu/items/{id}
```

---

## Your Frontend Files (partially done — improve them)

```
frontend/src/pages/Menu.tsx       ← Customer digital menu (exists — check it)
```

### Frontend pages YOU need to add

- `src/pages/admin/MenuManagement.tsx` — admin CRUD for categories and items
- `src/pages/kitchen/KitchenQueue.tsx` — real-time kitchen order list with status buttons

---

## Tests You Must Write

Location: `src/test/java/com/group06/restaurantevent/orders/`

```java
// 1. Unavailable menu item → 409 Conflict
// 2. Empty order items → 400 Bad Request
// 3. Quantity < 1 → 400 Bad Request
// 4. itemNameSnapshot is saved, not live menu name
// 5. Customer cannot access /api/kitchen/orders (403)
// 6. Kitchen staff can update to allowed status only
```

---

## Commit Message Convention

```
feat(menu): add category CRUD endpoints
feat(menu): add menu item availability toggle
feat(orders): add customer order creation
feat(kitchen): add kitchen queue status updates
test(orders): reject unavailable menu item order
```

---

## Pull Request Checklist

- [ ] `mvn test` passes
- [ ] `npm run build` passes
- [ ] Tested with Swagger/Postman
- [ ] Price snapshot saved correctly
- [ ] KITCHEN_STAFF role enforced on kitchen endpoints
- [ ] No `.env` committed

---

## Files Included in This Package

```
backend-module/menu/    ← Empty — YOU implement this completely
backend-module/orders/  ← Empty — YOU implement this completely
frontend-files/Menu.tsx ← Existing customer menu page to review
```

*Group 06 · SLIIT 2026*
