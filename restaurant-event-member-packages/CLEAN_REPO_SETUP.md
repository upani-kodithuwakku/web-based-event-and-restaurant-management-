# Setting Up a New Git Repository from the Clean Snapshot

Follow these steps to initialise a fresh Git repository from `CLEAN_PROJECT_SNAPSHOT/`.

## Step 1 — Copy the snapshot

```bash
cp -r CLEAN_PROJECT_SNAPSHOT/ ~/my-new-repo/
cd ~/my-new-repo/
```

## Step 2 — Initialise Git

```bash
git init
git add .
git commit -m "feat: initial project structure"
```

## Step 3 — Add remote and push

```bash
git remote add origin https://github.com/your-org/your-repo.git
git push -u origin main
```

## Step 4 — MySQL setup

```sql
CREATE DATABASE IF NOT EXISTS restaurant_event_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

## Step 5 — Backend environment

Create `restaurant-event-backend/.env` from `.env.example`:

```properties
DB_HOST=localhost
DB_PORT=3306
DB_NAME=restaurant_event_db
DB_USERNAME=root
DB_PASSWORD=your_local_password
JWT_SECRET=a-very-long-random-string-at-least-64-chars
```

## Step 6 — Run the backend

```bash
cd restaurant-event-backend
./mvnw clean spring-boot:run
```

Verify: GET http://localhost:8080/api/health returns `{"status":"UP"}`

## Step 7 — Run the frontend

```bash
cd restaurant-event-frontend
npm install
npm run dev
```

Visit http://localhost:5173

## Security reminders

- The `.env` file must be in `.gitignore`. Verify before every push.
- Never store real passwords or JWT secrets in `application.properties`.
- Use long random strings (64+ characters) for JWT secrets in all environments.
