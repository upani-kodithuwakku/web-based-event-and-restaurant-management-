# Run and Test — Event Booking

## Prerequisites
- Backend running on http://localhost:8080
- Roles seeded (DataSeeder runs on startup)
- At least one EVENT_COORDINATOR user exists

## Seed Test Data

Use Swagger or Postman to create:
1. Admin login to get token
2. POST /api/admin/halls (create 2 halls)
3. POST /api/admin/packages (create 2 packages)
4. Register a CUSTOMER user

## Manual Tests

### Create Hall (as ADMIN)
```
POST /api/admin/halls
Authorization: Bearer <admin_token>
{
  "name": "Grand Ballroom",
  "capacity": 300,
  "location": "Ground Floor",
  "description": "Luxury ballroom with stage"
}
```
Expected: 201 Created

### Check Availability
```
GET /api/events/availability?hallId=1&date=2026-12-25&startTime=18:00&endTime=23:00&guestCount=150
```
Expected: 200 with available: true

### Create Booking (as CUSTOMER)
```
POST /api/events/bookings
Authorization: Bearer <customer_token>
{
  "hallId": 1,
  "packageId": 1,
  "eventDate": "2026-12-25",
  "startTime": "18:00",
  "endTime": "23:00",
  "guestCount": 150
}
```
Expected: 201 with booking reference like EVT-20261225-XXXX, status: PENDING

### Overlapping Booking
Attempt same hall, date, overlapping times.
Expected: 409 Conflict

### Approve (as EVENT_COORDINATOR)
```
PATCH /api/event-coordinator/bookings/1/approve
Authorization: Bearer <coordinator_token>
```
Expected: 200, status changes to APPROVED

### Reject with Reason
```
PATCH /api/event-coordinator/bookings/2/reject
{ "rejectionReason": "Hall unavailable" }
```
Expected: 200, status changes to REJECTED

## Run Unit Tests
```bash
./mvnw test -Dtest="EventBookingServiceTest,BillingServiceTest"
```
