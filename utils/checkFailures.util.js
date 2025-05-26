const fs = require("fs");
const path = require("path");
const FailureCounter = require("../models/FailureCounter.model");

async function checkFailures(deviceId, totalErrors) {
  try {
    let updatedDoc;

    if (totalErrors > 0) {
      updatedDoc = await FailureCounter.findOneAndUpdate(
        { deviceId },
        { $inc: { failureCount: 1 } },
        { new: true, upsert: true }
      );
    } else {
      updatedDoc = await FailureCounter.findOneAndUpdate(
        { deviceId },
        { $set: { failureCount: 0 } },
        { new: true, upsert: true }
      );
    }

    if (updatedDoc.failureCount >= 3) {
      const alertMessage = `[ALERT] ${new Date().toISOString()} - Device ${deviceId} has failed ${
        updatedDoc.failureCount
      } times in a row!\n`;
      console.log(alertMessage.trim());

      const logsDir = path.join(__dirname, "../logs");
      const logPath = path.join(logsDir, "syncerror.log");

      if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
      }

      fs.appendFileSync(logPath, alertMessage, "utf8");
    }
  } catch (err) {
    console.error("❌ checkFailures error:", err.message);
  }
}

module.exports = { checkFailures };
