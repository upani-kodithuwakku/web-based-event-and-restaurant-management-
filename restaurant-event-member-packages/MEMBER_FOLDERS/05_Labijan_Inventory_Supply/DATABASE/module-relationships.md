# Relationships — Inventory and Supply

- purchase_orders many-to-one suppliers
- purchase_order_items many-to-one purchase_orders
- purchase_order_items many-to-one inventory_items
- stock_movements many-to-one inventory_items
- menu_item_ingredients many-to-one inventory_items (this module)
- menu_item_ingredients many-to-one menu_items (Module 03 owns menu_items)

## Key Integration Point

When OrderService places a food order (Module 03), it calls InventoryService.checkAndDeductStock():
1. For each FoodOrderItem, look up MenuItemIngredient rows for that menu item.
2. Multiply quantity_required by the order item quantity.
3. Check inventory_items.current_quantity >= required amount. If not, throw exception (order rejected).
4. Deduct: UPDATE inventory_items SET current_quantity = current_quantity - :amount WHERE id = :id.
5. Insert a StockMovement record (type OUT, reference_type FOOD_ORDER, reference_id = orderId).
6. If current_quantity < reorder_level, create LOW_STOCK notification.
7. All steps are in a single @Transactional method.
