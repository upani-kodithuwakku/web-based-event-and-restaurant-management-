# Entities — Inventory and Supply

## InventoryItem
Package: `com.group06.restaurantevent.inventory.entity`
Fields: id, name, unit, currentQuantity, reorderLevel, isActive

## Supplier
Package: `com.group06.restaurantevent.inventory.entity`
Fields: id, name, contactPerson, phone, email, address, isActive

## PurchaseOrder
Package: `com.group06.restaurantevent.inventory.entity`
Fields: id, poNumber, supplier (ManyToOne Supplier), status (PurchaseOrderStatus), orderedAt, receivedAt, notes, items (OneToMany PurchaseOrderItem)

## PurchaseOrderItem
Package: `com.group06.restaurantevent.inventory.entity`
Fields: id, purchaseOrder (ManyToOne), inventoryItem (ManyToOne InventoryItem), quantityOrdered, quantityReceived, unitCost

## StockMovement
Package: `com.group06.restaurantevent.inventory.entity`
Fields: id, inventoryItem (ManyToOne InventoryItem), movementType (MovementType), quantityChange, referenceType, referenceId, note, createdAt

## MenuItemIngredient
Package: `com.group06.restaurantevent.inventory.entity` (or menu)
Fields: id, menuItem (ManyToOne MenuItem), inventoryItem (ManyToOne InventoryItem), quantityRequired
