# Frontend Test Map — Table Reservations

## Reservations.tsx
- Customer's reservations load on mount
- Status badges render with correct colour per status
- Cancel button only visible for PENDING/CONFIRMED reservations
- Cancel confirmation dialog works

## BookingModal.tsx
- Date must be future (past date shows error)
- Guest count must be > 0
- Check Availability triggers API call and shows results
- No results shows alternative time suggestions
- Form validation before submit
- Booking reference shown on success

## AdminReservations.tsx
- Date picker defaults to today
- Reservations list filtered by selected date
- Check-in button only shows for CONFIRMED
- Complete/No-show buttons only show for CHECKED_IN
- Action updates card status without page reload

## Tables.tsx
- All tables listed with status indicators
- Create table form validates required fields
- Status change (OUT_OF_SERVICE toggle) works
- Deactivate table with confirmation

## Discover.tsx
- Table grid/map shows current status by colour
- Green = AVAILABLE, yellow = RESERVED, red = OCCUPIED, grey = OUT_OF_SERVICE
