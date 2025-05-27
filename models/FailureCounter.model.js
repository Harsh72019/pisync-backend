const mongoose = require("mongoose");
const {paginate} = require("./plugin/paginate");
const failureCounterSchema = new mongoose.Schema({
  deviceId: { type: String, unique: true },
  failureCount: { type: Number, default: 0 },
});
failureCounterSchema.index({ failureCount: 1 }); 
failureCounterSchema.plugin(paginate)

module.exports = mongoose.model("FailureCounter", failureCounterSchema);
