# Backend Test Map — Menu and Orders

## MenuServiceTest

| Test | Scenario | Expected |
|------|----------|----------|
| createCategorySuccess | Valid data | Category saved |
| createItemSuccess | Valid item with category | Item saved |
| toggleAvailability | isAvailable flips | Item updated |
| getAvailableItemsOnly | Items with isAvailable=false | Not returned |

## OrderServiceTest

| Test | Scenario | Expected |
|------|----------|----------|
| placeOrderSuccess | All items available, stock sufficient | Order created, stock deducted |
| placeOrderUnavailableItem | Item isAvailable=false | 400 exception |
| placeOrderInsufficientStock | Not enough inventory | 400 exception |
| kitchenUpdateStatusSuccess | KITCHEN_STAFF updates to PREPARING | Status changed |
| kitchenUpdateStatusBackward | Try to set PENDING after PREPARING | 400 exception |
| customerCannotUpdateStatus | CUSTOMER calls kitchen endpoint | 403 |
| stockDeductionTransactional | Stock deducted and notification created in same transaction | Both or neither |

## Run
```bash
./mvnw test -Dtest="MenuServiceTest,OrderServiceTest"
```
