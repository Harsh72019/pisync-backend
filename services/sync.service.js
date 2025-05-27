const FailureCounter = require("../models/FailureCounter.model");
const SyncEvent = require("../models/SyncEvent.model");

const syncQueue = require("../queues/syncQueue");

exports.receiveSyncEventService = async (data) => {
  await syncQueue.add("sync-event", data);
  return true;
};

exports.getSyncHistoryService = async (filters , options) => {

  const events = await SyncEvent.paginate(filters, options);
  return events;
};

exports.getRepeatedFailuresService = async (filters , options) => {
  const failedDevices = await FailureCounter.paginate(filters, options);
  return failedDevices;
};
