# Frontend Test Map — Event Booking

## Events.tsx (customer)
- Halls and packages load on mount
- Date/time/guests form validates before submit
- Availability check called before showing booking button
- Successful booking shows reference number
- My bookings tab shows status badges correctly

## AdminEvents.tsx (coordinator)
- Pending bookings highlighted in list
- Approve button triggers status change
- Reject modal requires reason before submit
- Calendar renders events by date
- Filter by status works

## Cashier.tsx
- Search by booking reference finds event booking
- Invoice creation form populates from booking data
- Payment method selection switches strategy label
- Paid status reflected after payment recorded
