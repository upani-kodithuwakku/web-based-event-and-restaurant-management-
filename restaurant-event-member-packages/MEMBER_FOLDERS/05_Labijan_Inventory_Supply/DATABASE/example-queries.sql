-- Example SQL queries for Inventory and Supply module

-- 1. List all low-stock items
SELECT id, name, unit, current_quantity, reorder_level
FROM inventory_items
WHERE is_active = TRUE AND current_quantity < reorder_level
ORDER BY (current_quantity / reorder_level);

-- 2. Stock movement history for an item
SELECT sm.id, sm.movement_type, sm.quantity_change, sm.reference_type, sm.reference_id, sm.note, sm.created_at
FROM stock_movements sm
WHERE sm.inventory_item_id = 3
ORDER BY sm.created_at DESC;

-- 3. Check ingredient availability for a menu item
SELECT ii.name, ii.unit, ii.current_quantity, mii.quantity_required,
       CASE WHEN ii.current_quantity >= mii.quantity_required THEN 'OK' ELSE 'INSUFFICIENT' END
FROM menu_item_ingredients mii
JOIN inventory_items ii ON ii.id = mii.inventory_item_id
WHERE mii.menu_item_id = 5;

-- 4. Deduct stock (food order)
UPDATE inventory_items
SET current_quantity = current_quantity - 0.500
WHERE id = 3 AND current_quantity >= 0.500;

-- 5. Insert stock movement for deduction
INSERT INTO stock_movements (inventory_item_id, movement_type, quantity_change, reference_type, reference_id, note, created_at)
VALUES (3, 'OUT', -0.500, 'FOOD_ORDER', 12, 'Order ORD-20260920-XXXX', NOW());

-- 6. Receive goods from purchase order
UPDATE inventory_items
SET current_quantity = current_quantity + 20.000
WHERE id = 3;

UPDATE purchase_order_items
SET quantity_received = 20.000
WHERE purchase_order_id = 5 AND inventory_item_id = 3;

UPDATE purchase_orders
SET status = 'RECEIVED', received_at = NOW()
WHERE id = 5;

-- 7. List purchase orders by supplier
SELECT po.po_number, s.name AS supplier, po.status, po.ordered_at, po.received_at
FROM purchase_orders po
JOIN suppliers s ON s.id = po.supplier_id
ORDER BY po.ordered_at DESC;

-- 8. Inventory value report
SELECT ii.name, ii.unit, ii.current_quantity,
       (ii.current_quantity * COALESCE((
         SELECT unit_cost FROM purchase_order_items poi
         JOIN purchase_orders po ON po.id = poi.purchase_order_id
         WHERE poi.inventory_item_id = ii.id AND po.status = 'RECEIVED'
         ORDER BY po.received_at DESC LIMIT 1
       ), 0)) AS estimated_value
FROM inventory_items ii
WHERE ii.is_active = TRUE;
