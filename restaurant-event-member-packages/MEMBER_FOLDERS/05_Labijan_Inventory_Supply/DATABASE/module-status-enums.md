# Status Enums — Inventory and Supply

## MovementType
Located in: `com.group06.restaurantevent.common.enums.MovementType`
Values:
- IN — stock received (purchase order, manual addition)
- OUT — stock consumed (food order, wastage)
- ADJUSTMENT — manual correction
- WASTE — spoilage or disposal
- TRANSFER — moved between locations

## PurchaseOrderStatus
Located in: `com.group06.restaurantevent.common.enums.PurchaseOrderStatus`
Values:
- DRAFT — order not yet sent
- ORDERED — sent to supplier
- RECEIVED — goods received and stock updated
- CANCELLED — order cancelled
