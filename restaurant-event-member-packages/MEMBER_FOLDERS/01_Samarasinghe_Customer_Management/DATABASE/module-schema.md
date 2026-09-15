# Database Schema — Customer Management

## users table

```sql
CREATE TABLE users (
  id           BIGINT AUTO_INCREMENT PRIMARY KEY,
  full_name    VARCHAR(255) NOT NULL,
  email        VARCHAR(255) UNIQUE NOT NULL,
  phone        VARCHAR(50),
  password_hash VARCHAR(255) NOT NULL,
  is_active    BOOLEAN DEFAULT TRUE,
  created_at   DATETIME,
  updated_at   DATETIME
);
```

## roles table

```sql
CREATE TABLE roles (
  id          BIGINT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(50) UNIQUE NOT NULL,
  description VARCHAR(255)
);
```

## user_roles table

```sql
CREATE TABLE user_roles (
  user_id BIGINT NOT NULL,
  role_id BIGINT NOT NULL,
  PRIMARY KEY (user_id, role_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (role_id) REFERENCES roles(id)
);
```

## notifications table

```sql
CREATE TABLE notifications (
  id         BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id    BIGINT NOT NULL,
  title      VARCHAR(255) NOT NULL,
  message    TEXT NOT NULL,
  type       VARCHAR(50),
  is_read    BOOLEAN DEFAULT FALSE,
  created_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## password_reset_tokens table

```sql
CREATE TABLE password_reset_tokens (
  id         BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id    BIGINT NOT NULL,
  token      VARCHAR(255) UNIQUE NOT NULL,
  expires_at DATETIME NOT NULL,
  used       BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```
