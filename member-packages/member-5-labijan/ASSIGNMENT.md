# Member 5 — Your Assignment
## Labijan S.
**Module: Inventory & Supplier Management**
**Branch: `feature/inventory`**

---

## Your Git Setup

```bash
git clone <your-team-repo-url>
cd web-based-event-and-restaurant-management-
git checkout develop && git pull origin develop
git checkout -b feature/inventory
```

---

## Run the Project

```bash
# Terminal 1 — Backend
cd restaurant-event-backend && cp .env.example .env && mvn spring-boot:run

# Terminal 2 — Frontend
cd restaurant-event-frontend && npm install && npm run dev
```
Frontend: http://localhost:5173  →  Admin workspace → Inventory

---

## Your Backend Files (empty skeleton — YOU implement everything)

```
restaurant-event-backend/src/main/java/com/group06/restaurantevent/inventory/
├── entity/
│   ├── InventoryItem.java         ← id, name, unit, currentQuantity (DECIMAL 12,3),
│   │                                 reorderLevel, isActive, createdAt, updatedAt
│   ├── MenuItemIngredient.java    ← id, menuItemId, inventoryItemId, quantityRequired
│   ├── Supplier.java              ← id, name, contactPerson, phone, email, address, isActive
│   ├── PurchaseOrder.java         ← id, poNumber, supplierId, status, orderedAt,
│   │                                 receivedAt, notes
│   ├── PurchaseOrderItem.java     ← id, purchaseOrderId, inventoryItemId,
│   │                                 quantityOrdered, quantityReceived, unitCost
│   └── StockMovement.java         ← id, inventoryItemId, movementType, quantityChange,
│                                     referenceType, referenceId, note, createdAt
├── dto/request/
│   ├── CreateInventoryItemRequest.java
│   ├── UpdateInventoryItemRequest.java
│   ├── AdjustStockRequest.java
│   ├── CreateSupplierRequest.java
│   └── CreatePurchaseOrderRequest.java
├── dto/response/
│   ├── InventoryItemResponse.java
│   ├── SupplierResponse.java
│   ├── PurchaseOrderResponse.java
│   └── StockMovementResponse.java
├── repository/
│   ├── InventoryItemRepository.java
│   ├── SupplierRepository.java
│   ├── PurchaseOrderRepository.java
│   └── StockMovementRepository.java
├── service/
│   ├── InventoryService.java      ← CRUD, stock adjust, low-stock check
│   └── PurchaseOrderService.java  ← create PO, receive, update status
├── controller/
│   ├── InventoryController.java   ← INVENTORY_MANAGER + ADMIN endpoints
│   └── PurchaseOrderController.java
└── mapper/
    └── InventoryMapper.java
```

---

## Business Rules You Must Enforce

1. `currentQuantity` and `quantityRequired` must use `DECIMAL(12,3)` — supports grams, litres, pieces.
2. `currentQuantity` cannot go below zero (reject with 409).
3. When `currentQuantity ≤ reorderLevel` after any deduction, trigger a low-stock notification to all INVENTORY_MANAGER users.
4. A food order deducts ingredients according to `MenuItemIngredient` (quantity ordered × quantityRequired per item).
5. If any ingredient has insufficient stock, the order is rejected with 409.
6. PO status flow:
   ```
   DRAFT → ORDERED → PARTIALLY_RECEIVED → RECEIVED → CANCELLED
   ```
7. Receiving a PO increments `currentQuantity` and creates a `StockMovement` (type: `PURCHASE`).
8. Every stock change must create a `StockMovement` record.
9. Only `INVENTORY_MANAGER` and `ADMIN`/`MANAGER` can manage inventory and POs.
10. `isActive = false` instead of deleting items that have stock history.

---

## Endpoints to Implement

```
# Inventory items — INVENTORY_MANAGER + ADMIN
GET    /api/inventory/items
GET    /api/inventory/items/{id}
POST   /api/inventory/items
PUT    /api/inventory/items/{id}
PATCH  /api/inventory/items/{id}/adjust   ← body: { delta, note }
DELETE /api/inventory/items/{id}          ← sets isActive=false

# Low-stock report
GET    /api/inventory/items/low-stock

# Stock movements
GET    /api/inventory/movements?itemId=&from=&to=

# Suppliers
GET    /api/inventory/suppliers
POST   /api/inventory/suppliers
PUT    /api/inventory/suppliers/{id}

# Purchase orders
GET    /api/inventory/purchase-orders
POST   /api/inventory/purchase-orders
GET    /api/inventory/purchase-orders/{id}
PATCH  /api/inventory/purchase-orders/{id}/status
POST   /api/inventory/purchase-orders/{id}/receive   ← body: list of received qtys
```

---

## Your Frontend Files (EXISTS — connect to real API)

```
frontend-files/Inventory.tsx   ← Admin inventory panel (already built in demo mode)
```

### What to IMPROVE in Inventory.tsx

- Remove/conditionally hide demo-mode seed data when VITE_DEMO_MODE=false.
- Wire all buttons (Add, Edit, +10/-1) to the real endpoints above.
- Add a Suppliers tab with CRUD.
- Add a Purchase Orders tab: create PO → receive PO.
- Add a Stock Movements tab with date filter.

### Frontend pages YOU need to add

- `src/pages/admin/LowStockAlert.tsx` — low-stock dashboard widget (can be embedded in Reports page).

---

## Interaction with Other Modules

You share data with the **Orders module (Ahamed)**:

- `MenuItemIngredient` links your `InventoryItem` to their `MenuItem`.
- When an order is created, the `OrderService` must call your `InventoryService.deductIngredients()`.
- Coordinate the method signature and transaction boundary with Ahamed.

```java
// Expected interface in InventoryService
void deductIngredients(Long menuItemId, int quantity);   // throws InsufficientStockException
```

---

## Design Pattern You Must Implement

### Observer Pattern (Spring Events)

```java
// 1. Publish an event when stock falls below reorder level
@Component
public class LowStockEventPublisher {
    // Publish LowStockEvent after any deduction
}

// 2. Listen and create a Notification
@Component
public class LowStockNotificationListener {
    @EventListener
    public void onLowStock(LowStockEvent event) {
        // call NotificationService to notify all INVENTORY_MANAGER users
    }
}
```

Document this in your ASSIGNMENT for the design patterns mark.

---

## Tests You Must Write

Location: `src/test/java/com/group06/restaurantevent/inventory/`

```java
// 1. Stock adjust below zero → 409
// 2. Deduct ingredients for order — currentQuantity decreases correctly
// 3. Insufficient stock → 409, order not placed
// 4. Low-stock notification created when quantity ≤ reorderLevel
// 5. StockMovement record created for every adjustment
// 6. PO receive: currentQuantity incremented by quantityReceived
// 7. CUSTOMER cannot access /api/inventory/items (403)
// 8. isActive=false item excluded from active item list
```

---

## Commit Messages

```
feat(inventory): add inventory item CRUD
feat(inventory): add stock adjustment endpoint
feat(inventory): add low-stock notification via Spring events
feat(inventory): add supplier CRUD
feat(inventory): add purchase order flow
feat(inventory): add stock movement history
test(inventory): reject negative stock adjustment
test(inventory): verify low-stock notification created
```

---

## Pull Request Checklist

- [ ] `mvn test` passes
- [ ] `npm run build` passes
- [ ] Low-stock notification tested via Swagger
- [ ] Stock deduction integrated with Orders module (coordinate with Ahamed)
- [ ] All stock movements recorded
- [ ] INVENTORY_MANAGER role enforced
- [ ] No `.env` committed

---

## Files in This Package

```
backend-module/inventory/    ← Empty — YOU implement
frontend-files/Inventory.tsx ← Existing admin inventory page
```

*Group 06 · SLIIT 2026*
