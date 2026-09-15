# Module Completion Checklist — Inventory and Supply

## Backend
- [ ] InventoryItem entity and CRUD
- [ ] Low-stock query endpoint
- [ ] Manual stock adjustment endpoint
- [ ] StockMovement created on every quantity change
- [ ] Insufficient adjustment (below zero) rejected
- [ ] Low-stock notification triggered when threshold crossed
- [ ] Supplier entity and CRUD
- [ ] PurchaseOrder entity and CRUD
- [ ] PurchaseOrderItem with quantity tracking
- [ ] Receive goods endpoint updates quantities and creates StockMovement IN
- [ ] MenuItemIngredient CRUD endpoints
- [ ] checkAndDeductStock() called by OrderService correctly
- [ ] Insufficient stock rejects food order with clear error
- [ ] Transaction covers deduction + notification + StockMovement

## Frontend
- [ ] Inventory.tsx stock items tab loads
- [ ] Low-stock items highlighted
- [ ] Adjustment modal works
- [ ] Suppliers tab CRUD works
- [ ] Purchase orders tab CRUD works
- [ ] Receive goods modal updates quantities

## Tests
- [ ] InventoryServiceTest all pass
- [ ] Insufficient stock test rejects order

## Database
- [ ] inventory_items, suppliers, purchase_orders, purchase_order_items, stock_movements created
- [ ] DECIMAL(12,3) used for quantities
- [ ] No secrets committed
