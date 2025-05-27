const { Queue } = require("bullmq");
const redis = require("../config/redis.config");

const syncQueue = new Queue("sync-events", { connection: redis });
module.exports = syncQueue;
