# Module Completion Checklist — Menu and Orders

## Backend
- [ ] MenuCategory entity and CRUD
- [ ] MenuItem entity and CRUD
- [ ] Availability toggle endpoint
- [ ] Public menu browse returns only available active items
- [ ] FoodOrder entity and placement endpoint
- [ ] FoodOrderItem with snapshot fields
- [ ] Order reference generated uniquely
- [ ] Unavailable item order rejected (400)
- [ ] Insufficient stock rejected (400)
- [ ] Stock deducted transactionally on order placement
- [ ] Low-stock notification triggered if threshold reached
- [ ] Kitchen status update endpoint
- [ ] Status cannot go backward
- [ ] CUSTOMER forbidden from kitchen endpoint
- [ ] Swagger documents all endpoints

## Frontend
- [ ] Menu.tsx loads categories and items
- [ ] Unavailable items greyed out
- [ ] Cart state managed correctly
- [ ] Order placed and reference shown
- [ ] Kitchen.tsx shows active orders
- [ ] Status updates work and re-render

## Tests
- [ ] MenuServiceTest all pass
- [ ] OrderServiceTest all pass
- [ ] Transaction test passes

## Database
- [ ] menu_categories, menu_items, food_orders, food_order_items tables created
- [ ] menu_item_ingredients table created
- [ ] No secrets committed
