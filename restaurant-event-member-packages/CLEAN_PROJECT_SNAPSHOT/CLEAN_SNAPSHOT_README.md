# Clean Project Snapshot

This directory is a full source snapshot of the Web-Based Restaurant and Event Management System (Group 06).

It contains no Git history, no build artefacts, no compiled classes, no node_modules, and no environment secrets.

## Purpose

Use this snapshot to:
- Review the complete codebase locally
- Set up a fresh development environment
- Create your own Git repository from a clean baseline

## Prerequisites

- Java 21 (via SDKMAN or Homebrew)
- Maven 3.9+
- Node.js 20+ and npm 10+
- MySQL 8 running locally on port 3306
- Database `restaurant_event_db` created (see below)

## Database Setup

Open MySQL Workbench or run:

```sql
CREATE DATABASE IF NOT EXISTS restaurant_event_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

Then create a `.env` file inside `restaurant-event-backend/` based on `.env.example`:

```properties
DB_HOST=localhost
DB_PORT=3306
DB_NAME=restaurant_event_db
DB_USERNAME=root
DB_PASSWORD=your_password_here
JWT_SECRET=replace-with-a-long-random-secret
```

## Run the Backend

```bash
cd restaurant-event-backend
./mvnw spring-boot:run
```

Backend starts on http://localhost:8080

Swagger UI: http://localhost:8080/swagger-ui/index.html

Health check: http://localhost:8080/api/health

## Run the Frontend

```bash
cd restaurant-event-frontend
npm install
npm run dev
```

Frontend starts on http://localhost:5173

## Important

- Never commit real secrets, passwords, or JWT keys to any Git repository.
- Use `.env` files that are listed in `.gitignore`.
- This snapshot contains `.env.example` showing the required variable names without real values.
