# Entities — Customer Management

## User Entity
Package: `com.group06.restaurantevent.users.entity`

Fields: id, fullName, email, phone, passwordHash, isActive, createdAt, updatedAt, roles (ManyToMany)

## Role Entity
Package: `com.group06.restaurantevent.users.entity`

Fields: id, name, description

## Notification Entity
Package: `com.group06.restaurantevent.notifications.entity`

Fields: id, user (ManyToOne), title, message, type, isRead, createdAt

## PasswordResetToken Entity
Package: `com.group06.restaurantevent.auth.entity`

Fields: id, user (ManyToOne), token, expiresAt, used
