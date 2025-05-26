
# 📦 PiSync Backend

Just created a backend service to handle 20k to 50k devices per hour syncing data to this service

---

## 🚀 Features

- Sync device API with proper validation and rate limiting (can be removed if required)
- Offloading the server thorugh background job queue handled by BullMQ and redis
- Logs the repeated failure if failed more than 3 times in a row
- Also created Swagger API docs which you can access at `http://localhost:500/api-docs` after starting the server

---

## 🛠️ Installation & Setup

### 1. Clone the repo

```bash
git clone https://github.com/Harsh72019/pisync-backend.git
cd pisync-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file in the root:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/pisync
REDIS_HOST=localhost
REDIS_URL=redis://default:test.redis-cloud.com:19257
REDIS_PORT=6379
NODE_ENV=development
```

---

## 🧠 Redis Installation Guide

> Required for BullMQ job queues.

### ✅ Ubuntu / Debian

```bash
sudo apt update
sudo apt install redis-server
sudo systemctl enable redis-server
sudo systemctl start redis-server
```

### ✅ Mac (Homebrew)

```bash
brew install redis
brew services start redis
```

### ✅ Windows

1. Install Redis using [Memurai](https://www.memurai.com/) or [MSOpenTech Redis](https://github.com/microsoftarchive/redis/releases).
2. Start Redis server manually or as a background service.

Verify Redis is running:

```bash
redis-cli ping
# Should return: PONG
```

---

## 📑 API Documentation

After starting the server:

🔗 Swagger is reachable at:

```
http://localhost:5000/api-docs
```

---

## ✅ Start the App

```bash
npm run dev
```

Before starting the server just make sure that Redis and MongoDB are running.

---

## 📂 Folder Structure

```
├── controllers/
├── models/
├── routes/
├── queues/
├── workers/
├── utils/
├── middlewares/
├── logs/
├── config/
├── .env
└── app.js
└── server.js
```

---

## 🧪 Load Testing (Optional)

You can test 5000 sync request like i test with the following command . It simulates 5000 sync events:

```bash
node loadTester.js
```

## Bull dashboard

You can also check the queue status at the bull dashboard which is accessible at 
```bash
http://localhost:5000/admin/queues
```