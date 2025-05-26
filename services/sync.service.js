const FailureCounter = require("../models/FailureCounter.model");
const SyncEvent = require("../models/SyncEvent.model");

const syncQueue = require("../queues/syncQueue");

exports.receiveSyncEventService = async (data) => {
  await syncQueue.add("sync-event", data);
  return true;
};

exports.getSyncHistoryService = async (deviceId) => {
  const events = await SyncEvent.find({ deviceId }).sort({ timestamp: -1 });
  return events;
};

exports.getRepeatedFailuresService = async () => {
  const failedDevices = await FailureCounter.find({
    failureCount: { $gte: 3 },
  });
  return failedDevices;
};
