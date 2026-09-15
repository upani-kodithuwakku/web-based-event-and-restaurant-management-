# Backend Test Map — Inventory and Supply

## InventoryServiceTest

| Test | Scenario | Expected |
|------|----------|----------|
| createItemSuccess | Valid item | Saved |
| adjustStockPositive | Positive adjustment | currentQuantity increases, StockMovement IN created |
| adjustStockNegative | Negative adjustment | currentQuantity decreases, StockMovement OUT |
| adjustStockBelowZero | Would make quantity negative | 400 exception |
| checkAndDeductStockSuccess | Sufficient stock | Stock deducted, StockMovement created |
| checkAndDeductStockInsufficient | Not enough stock | Exception, no deduction |
| lowStockNotificationTriggered | Deduction brings qty below reorderLevel | LOW_STOCK notification created |
| receiveGoodsSuccess | Valid receive | Item quantity increases, PO status RECEIVED |
| createPurchaseOrderSuccess | Valid PO | PO number generated |

## Run
```bash
./mvnw test -Dtest="InventoryServiceTest"
```
