# Status Enums — Customer Management

## Role Names (seeded, not a Java enum)
- CUSTOMER
- ADMIN
- MANAGER
- WAITER
- KITCHEN_STAFF
- EVENT_COORDINATOR
- CASHIER
- INVENTORY_MANAGER

## Notification Type (VARCHAR in DB)
- RESERVATION
- ORDER
- EVENT
- PAYMENT
- LOW_STOCK
- GENERAL

These are string values stored in the `type` column of the `notifications` table. The NotificationFactory maps business events to these type strings.
