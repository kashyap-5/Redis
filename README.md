# Redis Learning Projects

This repository contains hands-on Redis examples built as small Node.js apps.

## What This Repo Covers

- Local Redis setup with Docker
- Banner caching
- OTP with TTL
- User profile caching with JSON vs Hash
- Email queue with Redis Lists
- Order processing with BullMQ
- Pub/Sub notifications
- Live leaderboard with Sorted Sets

## Prerequisites

- Docker Desktop
- Node.js and npm
- Git

## 1. Clone Or Pull The Repository

If you have not cloned yet:

```bash
git clone https://github.com/kashyap-5/Redis.git
cd Redis
```

If already cloned:

```bash
git pull
```

## 2. Pull And Start Docker Images

Run this from the repository root:

```bash
docker compose up -d
```

What this does:

- Pulls required images (Redis and MongoDB) if not present
- Starts containers in the background
- Exposes Redis on port 6379 and MongoDB on port 27017

To stop containers later:

```bash
docker compose down
```

## 3. Install Dependencies With npm

Each project folder has its own package.json. Install dependencies inside each folder.

Example:

```bash
cd 08-live-admin-notification-pubsub
bun i
```

Do this for all project folders:

- 02-setup-local-redis
- 03-site-banner
- 04-login-otp-ttl
- 05-user-profile-cache-json-vs-hash
- 06-emial-queue-with-redis-lists
- 07-order-confirmation-bullmq
- 08-live-admin-notification-pubsub
- 09-live-leaderboard

## 4. Project Structure

```text
Redis/
	docker-compose.yml
	02-setup-local-redis/
	03-site-banner/
	04-login-otp-ttl/
	05-user-profile-cache-json-vs-hash/
	06-emial-queue-with-redis-lists/
	07-order-confirmation-bullmq/
	08-live-admin-notification-pubsub/
	09-live-leaderboard/
	Redis/              # Bruno API collection files
```

## 5. Run A Project

Go to the project folder, then run the script from package.json.

Example for pub/sub module:

```bash
cd 08-live-admin-notification-pubsub
npm run api
```

In another terminal (same folder):

```bash
npm run subscriber
```

Example for leaderboard:

```bash
cd 09-live-leaderboard
bun i
npm run dev
```

For modules where `src/index.js` is the entrypoint, use:

```bash
npm run dev
```

## 6. API Testing

Use the Bruno files inside the Redis folder to test endpoints quickly.

## Notes

- Make sure Docker containers are running before starting apps.
- Most modules in this repo use npm scripts to run files such as `src/index.js`, `src/api.js`, or `src/worker.js`.