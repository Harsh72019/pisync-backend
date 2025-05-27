const mongoose = require("mongoose");
const {paginate} = require("./plugin/paginate")
const syncEventSchema = new mongoose.Schema(
  {
    deviceId: { type: String, required: true, index: true },
    timestamp: { type: Date, required: true },
    totalFilesSynced: { type: Number, required: true },
    totalErrors: { type: Number, required: true },
    internetSpeed: { type: Number, required: true },
  },
  { timestamps: true }
);

// Indexes for performance
syncEventSchema.index({ deviceId: 1, createdAt: -1 });
syncEventSchema.index({ totalErrors: 1 });
syncEventSchema.plugin(paginate);

module.exports = mongoose.model("SyncEvent", syncEventSchema);
