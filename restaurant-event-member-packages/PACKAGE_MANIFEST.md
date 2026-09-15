# Package Manifest

Generated: 2026-09-15

## Output Location

`/Users/upanianupajaabhayarathnakodithuwakku/Documents/2y1s/DDD/restaurant-event-member-packages/`

## Clean Project Snapshot

| Item | Details |
|------|---------|
| Location | CLEAN_PROJECT_SNAPSHOT/ |
| Files | 186 files |
| Excluded | .git, node_modules, target, dist, .env, *.log, .DS_Store, .idea, .vscode |
| Included | All source code, pom.xml, package.json, .env.example, README files |

## ZIP Files

| File | Member | Module | Files in Folder | ZIP Size |
|------|--------|--------|-----------------|----------|
| 01_Samarasinghe_Customer_Management.zip | Samarasinghe M.H.D. | Customer Management | 71 | 67 KB |
| 02_Ahamed_Event_Booking.zip | Ahamed M.I.I. | Event Booking | 77 | 69 KB |
| 03_Batagodage_Menu_Orders.zip | Batagodage B.I. | Menu and Orders | 72 | 61 KB |
| 04_Kodithuwakku_Table_Reservations.zip | Kodithuwakku U.A.A. | Table Reservations | 74 | 73 KB |
| 05_Labijan_Inventory_Supply.zip | Labijan L. | Inventory and Supply | 60 | 50 KB |
| 06_Gunasekara_Staff_Scheduling.zip | Gunasekara M.N. | Staff Scheduling | 64 | 56 KB |

## What Each ZIP Contains

```
MEMBER_NAME/
├── README.md                     — Module overview and key rules
├── MODULE_SCOPE.md               — What is in/out of scope, boundary interfaces
├── RUN_AND_TEST.md               — How to run the app and test this module
├── API_ENDPOINTS.md              — All REST endpoints with examples
├── DATABASE_RELATIONSHIPS.md     — Tables, columns, FK relationships
├── FRONTEND_FLOW.md              — How frontend pages interact with this module
├── BACKEND/                      — The module's actual Java source files
├── FRONTEND/                     — The module's actual React/TypeScript files
├── DATABASE/
│   ├── module-schema.md          — CREATE TABLE SQL
│   ├── module-entities.md        — JPA entity field list
│   ├── module-relationships.md   — Relationship descriptions
│   ├── module-status-enums.md    — All enum values for this module
│   └── example-queries.sql       — 7-8 useful SQL queries
├── COMMON_REFERENCE/             — Read-only copies of common, security, config
│   └── backend/
│       ├── common/               — shared enums, exceptions, response wrappers
│       ├── security/             — JWT filter, JWT utils, UserDetailsServiceImpl
│       ├── config/               — SecurityConfig, CorsConfig, DataSeeder, HealthController
│       └── pom.xml               — Maven build config (reference only)
└── TESTING/
    ├── backend-test-map.md       — Unit test class and method map
    ├── frontend-test-map.md      — Frontend test scenarios
    ├── manual-test-cases.md      — Step-by-step manual test cases
    └── module-checklist.md       — Definition-of-done checklist
```

## Member Backend Module Assignments

| Member | Backend Modules |
|--------|----------------|
| 01 Samarasinghe | auth, users, notifications, reports |
| 02 Ahamed | events, billing |
| 03 Batagodage | menu, orders |
| 04 Kodithuwakku | reservations |
| 05 Labijan | inventory |
| 06 Gunasekara | staff |

## Member Frontend File Assignments

| Member | Frontend Files |
|--------|---------------|
| 01 Samarasinghe | pages/Auth.tsx, pages/Profile.tsx, pages/CustomerDashboard.tsx, pages/shared/NotFound.tsx, context/AppContext.tsx, services/api.ts |
| 02 Ahamed | pages/Events.tsx, pages/admin/AdminEvents.tsx, pages/admin/Cashier.tsx, services/api.ts |
| 03 Batagodage | pages/Menu.tsx, pages/admin/Kitchen.tsx, services/api.ts |
| 04 Kodithuwakku | pages/Reservations.tsx, pages/Discover.tsx, pages/admin/AdminReservations.tsx, pages/admin/Tables.tsx, components/BookingModal.tsx, services/api.ts, services/availability.ts |
| 05 Labijan | pages/admin/Inventory.tsx, services/api.ts |
| 06 Gunasekara | pages/admin/Staff.tsx, services/api.ts |

## Safety Verification

| Check | Result |
|-------|--------|
| .env files in output | None found |
| node_modules in output | None found |
| target/ in output | None found |
| Source repository modified | No — all original files intact |
| Git history modified | No |
| Credentials copied | No — .env.example only |
