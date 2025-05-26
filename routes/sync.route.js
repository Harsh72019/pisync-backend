// routes/syncRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/sync.controller");
const validateSync = require("../middlewares/validateSync");
const { syncRateLimiter, getRateLimiter } = require("../middlewares/rateLimit");

router.post("/sync-event" ,syncRateLimiter , validateSync, controller.receiveSyncEvent);
router.get("/device/:id/sync-history",getRateLimiter ,   controller.getSyncHistory);
router.get("/devices/repeated-failures", getRateLimiter ,  controller.getRepeatedFailures);

module.exports = router;
