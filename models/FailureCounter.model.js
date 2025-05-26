const mongoose = require("mongoose");

const failureCounterSchema = new mongoose.Schema({
  deviceId: { type: String, unique: true },
  failureCount: { type: Number, default: 0 },
});

failureCounterSchema.index({ failureCount: 1 }); 

module.exports = mongoose.model("FailureCounter", failureCounterSchema);
