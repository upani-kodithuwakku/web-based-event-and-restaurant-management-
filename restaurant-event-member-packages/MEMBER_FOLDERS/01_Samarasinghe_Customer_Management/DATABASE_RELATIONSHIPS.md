# Database Relationships — Customer Management

## Tables Owned

### users
| Column | Type | Notes |
|--------|------|-------|
| id | BIGINT PK AUTO_INCREMENT | |
| full_name | VARCHAR(255) NOT NULL | |
| email | VARCHAR(255) UNIQUE NOT NULL | |
| phone | VARCHAR(50) | |
| password_hash | VARCHAR(255) NOT NULL | BCrypt |
| is_active | BOOLEAN DEFAULT TRUE | |
| created_at | DATETIME | |
| updated_at | DATETIME | |

### roles
| Column | Type | Notes |
|--------|------|-------|
| id | BIGINT PK AUTO_INCREMENT | |
| name | VARCHAR(50) UNIQUE NOT NULL | e.g. CUSTOMER, ADMIN |
| description | VARCHAR(255) | |

### user_roles (join table)
| Column | Type | Notes |
|--------|------|-------|
| user_id | BIGINT FK -> users.id | |
| role_id | BIGINT FK -> roles.id | |

### password_reset_tokens (auth module)
| Column | Type | Notes |
|--------|------|-------|
| id | BIGINT PK AUTO_INCREMENT | |
| user_id | BIGINT FK -> users.id | |
| token | VARCHAR(255) UNIQUE | |
| expires_at | DATETIME | |
| used | BOOLEAN DEFAULT FALSE | |

### notifications
| Column | Type | Notes |
|--------|------|-------|
| id | BIGINT PK AUTO_INCREMENT | |
| user_id | BIGINT FK -> users.id | |
| title | VARCHAR(255) NOT NULL | |
| message | TEXT NOT NULL | |
| type | VARCHAR(50) | RESERVATION, ORDER, EVENT, PAYMENT, LOW_STOCK |
| is_read | BOOLEAN DEFAULT FALSE | |
| created_at | DATETIME | |

## Relationships

- users 1..* user_roles *..1 roles (many-to-many via join table)
- users 1..* notifications (one user receives many notifications)
- users 1..* password_reset_tokens (one user can request multiple resets)
- users is referenced by every other module (reservations.customer_id, food_orders.customer_id, etc.)

## Indexes

- UNIQUE on users.email
- INDEX on notifications.user_id
- INDEX on notifications.is_read
