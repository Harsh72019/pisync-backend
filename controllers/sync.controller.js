// controllers/syncController.js
const FailureCounter = require("../models/FailureCounter.model");
const SyncEvent = require("../models/SyncEvent.model");
const syncService = require("../services/sync.service");

// controllers/syncController.js
const syncQueue = require("../queues/syncQueue");

exports.receiveSyncEvent = async (req, res) => {
  try {
    await syncService.receiveSyncEventService(req.body);
    res.status(202).json({success: true, message: "Sync event queued successfully" });
  } catch (err) {
    console.error("Queue Error:", err);
    throw err;
  }
};




exports.getSyncHistory = async (req, res) => {
  try {
    if(!req.params.id) {
      return res.status(400).json({ error: "Device ID is required" });
    }
    const events = await syncService.getSyncHistoryService(req.params.id);
    res.json({success: true, data : events});
  } catch (err) {
    throw err;
  }
};

exports.getRepeatedFailures = async (req, res) => {
  try {
     const failedDevices = await syncService.getRepeatedFailuresService();
    res.status(200).json({success: true, data : failedDevices});
  } catch (err) {
    throw err;
  }
};
