const { Worker } = require("bullmq");
const redis = require("../config/redis.config");
const SyncEvent = require("../models/SyncEvent.model");
const {checkFailures} = require("../utils/checkFailures.util");

function startWorker() {
  const worker = new Worker(
    "sync-events",
    async (job) => {
      const event = job.data;
    //   console.log("Processing job:", event);
      await SyncEvent.create(event);
    
        await checkFailures(event.deviceId , event.totalErrors);
      
    },
    { connection: redis ,concurrency : 10 }
  );

  worker.on("completed", (job) => {
    // console.log(`Job ${job.id} completed`);
  });

  worker.on("failed", (job, err) => {
    // console.error(`Job ${job.id} failed:`, err.message);
  });

  console.log("Worker started from server process");
}

module.exports = startWorker;
