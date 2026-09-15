# Create Packages Report

## Detected Project Structure

### Backend
Root: `restaurant-event-backend/src/main/java/com/group06/restaurantevent/`

Modules detected:
- auth/ — controller, dto (request/response), entity, repository, service
- users/ — controller, dto (request/response), entity, repository, service
- notifications/ — controller, dto (request/response), entity, mapper, repository, service
- reports/ — controller, dto/response, service
- events/ — controller, dto (request/response), entity, mapper, repository, service
- billing/ — controller, dto (request/response), entity, mapper, repository, service
- menu/ — controller, dto (request/response), entity, mapper, repository, service
- orders/ — controller, dto (request/response), entity, mapper, repository, service
- reservations/ — controller, dto (request/response), entity, mapper, repository, service
- inventory/ — controller, dto (request/response), entity, mapper, repository, service
- staff/ — controller, dto (request/response), entity, mapper, repository, service
- common/ — audit/, enums/, exception/, response/
- security/ — JwtAuthFilter, JwtUtils, UserDetailsServiceImpl
- config/ — SecurityConfig, CorsConfig, DataSeeder, OpenApiConfig, HealthController
- RestaurantEventApplication.java

### Frontend
Root: `restaurant-event-frontend/src/`

Files detected:
- App.tsx, main.tsx, index.css, data.ts, types.ts
- context/AppContext.tsx
- services/api.ts, services/availability.ts
- components/AdminLayout.tsx, Layout.tsx, UI.tsx, BookingModal.tsx
- pages/Auth.tsx, CustomerDashboard.tsx, Discover.tsx, Events.tsx, Menu.tsx, Profile.tsx, Reservations.tsx
- pages/shared/NotFound.tsx
- pages/admin/Dashboard.tsx, AdminReservations.tsx, Tables.tsx, AdminEvents.tsx, Inventory.tsx, Kitchen.tsx, Cashier.tsx, Staff.tsx, Reports.tsx

## Module File Mapping

| Member | Backend Modules | Frontend Pages |
|--------|----------------|----------------|
| 01 Samarasinghe | auth, users, notifications, reports | Auth, Profile, CustomerDashboard, NotFound, AppContext, api.ts |
| 02 Ahamed | events, billing | Events, AdminEvents, Cashier, api.ts |
| 03 Batagodage | menu, orders | Menu, Kitchen, api.ts |
| 04 Kodithuwakku | reservations | Reservations, Discover, AdminReservations, Tables, BookingModal, api.ts, availability.ts |
| 05 Labijan | inventory | Inventory, api.ts |
| 06 Gunasekara | staff | Staff, api.ts |

## Common Reference (all members)
- common/ — shared enums, exceptions, response wrappers
- security/ — JWT filter, JWT utils, UserDetailsServiceImpl
- config/ — SecurityConfig, CorsConfig, DataSeeder, OpenApiConfig, HealthController
- pom.xml — Maven build configuration

## Risks and Notes

1. **services/api.ts is shared** — every member's FRONTEND/ folder contains a full copy of api.ts. Each member should only focus on the sections relevant to their module. The full copy is provided for reference and to avoid missing imports.

2. **billing module** — owned by Module 02 (Ahamed) but the Invoice and Payment entities are referenced by food orders (Module 03). Coordination needed on the invoice creation flow.

3. **menu_item_ingredients** — this entity bridges Module 03 (menu items) and Module 05 (inventory items). Both members need to coordinate on which module owns the JPA entity and repository. Currently placed in inventory module.

4. **DataSeeder** — lives in config/, owned by Module 01's common reference. All members should be aware that roles and initial admin are seeded here.

5. **No pages/shared/NotFound.tsx** issue — this file was confirmed present at `pages/shared/NotFound.tsx` and was copied successfully.

6. **Frontend components** — AdminLayout.tsx, Layout.tsx, UI.tsx are shared components not explicitly assigned to one member. They are available in the CLEAN_PROJECT_SNAPSHOT for all members to reference.

7. **CreateStaffUserRequest** DTO in staff module — this is a composite DTO that creates both a User and StaffProfile. It is the one place staff module touches user creation. Module 01 should be aware this DTO exists and does NOT bypass their AuthService directly — it calls UserService internally.
