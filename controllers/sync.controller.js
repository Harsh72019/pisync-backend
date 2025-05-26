// controllers/syncController.js
const FailureCounter = require("../models/FailureCounter.model");
const SyncEvent = require("../models/SyncEvent.model");

// controllers/syncController.js
const syncQueue = require("../queues/syncQueue");

exports.receiveSyncEvent = async (req, res) => {
  try {
    const data = req.body;
    await syncQueue.add("sync-event", data);
    res.status(202).json({success: true, message: "Sync event queued successfully" });
  } catch (err) {
    console.error("Queue Error:", err);
    res.status(500).json({ error: "Failed to queue sync event" });
  }
};




exports.getSyncHistory = async (req, res) => {
  try {
    const events = await SyncEvent.find({ deviceId: req.params.id }).sort({ timestamp: -1 });
    res.json({success: true, data : events});
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getRepeatedFailures = async (_req, res) => {
  try {
     const failedDevices = await FailureCounter.find({ failureCount: { $gte: 3 } });
    res.status(200).json({success: true, data : failedDevices});
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
