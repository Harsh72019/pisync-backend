# 📦 PiSync - Database Schema Design

This document outlines the MongoDB database schema for the PiSync backend system, designed to handle 100k+ devices syncing every hour.

---

## 📄 1. `SyncEvent` Collection

Stores each sync attempt made by a device.

```json
{
  "_id": ObjectId,
  "deviceId": "string",               // Unique device identifier
  "timestamp": "ISODate",             // Time of sync
  "totalFilesSynced": Number,         // Successfully synced files
  "totalErrors": Number,              // Errors during sync
  "internetSpeed": Number,            // Mbps
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

### 📌 Indexes:
- `deviceId`
- `deviceId + timestamp`
- `totalErrors`

---

## 📄 2. `FailureCounter` Collection

Tracks how many times a device has failed to sync consecutively.

```json
{
  "_id": ObjectId,
  "deviceId": "string",               // Unique device identifier
  "failureCount": Number,             // Consecutive sync failures
}
```

### 📌 Indexes:
- `deviceId`
- `failureCount`

---

## 🧠 Relationships

- `SyncEvent.deviceId` → references a device
- `FailureCounter.deviceId` has a 1:1 relationship per device

---

## 📈 Design Considerations for Scale

| Feature                        | Scalable Implementation                                                   |
|-------------------------------|----------------------------------------------------------------------------|
| High-write throughput         | ✅ Queue-based inserts with BullMQ and Redis                               |
| Fast querying by device       | ✅ Indexed `deviceId` and `timestamp` fields                              |
| Monitoring sync failures      | ✅ Optimized `FailureCounter` read access                                 |
| Log and alert mechanism       | ✅ Writes alert to log + we can later implement notification support                    |
| Database pressure reduction   | ✅ `FailureCounter` avoids repeated full history reads                     |