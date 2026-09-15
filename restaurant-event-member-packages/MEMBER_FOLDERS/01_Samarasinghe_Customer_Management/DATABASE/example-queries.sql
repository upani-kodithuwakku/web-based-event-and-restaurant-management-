-- Example SQL queries for Customer Management module

-- 1. List all active customers
SELECT u.id, u.full_name, u.email, u.phone, u.created_at
FROM users u
JOIN user_roles ur ON ur.user_id = u.id
JOIN roles r ON r.id = ur.role_id
WHERE r.name = 'CUSTOMER' AND u.is_active = TRUE
ORDER BY u.created_at DESC;

-- 2. Check if email already exists
SELECT COUNT(*) FROM users WHERE email = 'test@example.com';

-- 3. Get user with all roles
SELECT u.id, u.full_name, u.email, GROUP_CONCAT(r.name) AS roles
FROM users u
JOIN user_roles ur ON ur.user_id = u.id
JOIN roles r ON r.id = ur.role_id
WHERE u.id = 1
GROUP BY u.id;

-- 4. Count unread notifications for a user
SELECT COUNT(*) FROM notifications WHERE user_id = 1 AND is_read = FALSE;

-- 5. Mark all notifications read for a user
UPDATE notifications SET is_read = TRUE WHERE user_id = 1 AND is_read = FALSE;

-- 6. Get recent notifications for a user (last 20)
SELECT id, title, message, type, is_read, created_at
FROM notifications
WHERE user_id = 1
ORDER BY created_at DESC
LIMIT 20;

-- 7. Deactivate a user (admin action)
UPDATE users SET is_active = FALSE WHERE id = 5;

-- 8. Admin user list with role count
SELECT u.id, u.full_name, u.email, u.is_active, COUNT(ur.role_id) AS role_count
FROM users u
LEFT JOIN user_roles ur ON ur.user_id = u.id
GROUP BY u.id
ORDER BY u.created_at DESC;
