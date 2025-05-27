const syncService = require("../services/sync.service");

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
      const filters = {
        deviceId: req.params.id,
      }
      const {  page = 1, limit = 10 } = req.query;
      const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        sort: { timestamp: -1 },
      };
    const events = await syncService.getSyncHistoryService(filters, options);
    res.json({success: true, data : events});
  } catch (err) {
    throw err;
  }
};

exports.getRepeatedFailures = async (req, res) => {
  try {
      const {  page = 1, limit = 10 } = req.query;
      const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        sort: { failureCount: -1 },
      };
      const filters = {
        failureCount: { $gte: 3 },
      };
     const failedDevices = await syncService.getRepeatedFailuresService(  filters, options);
    res.status(200).json({success: true, data : failedDevices});
  } catch (err) {
    throw err;
  }
};
