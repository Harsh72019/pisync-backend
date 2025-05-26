const rateLimit = require("express-rate-limit");

// I can adjust this base on the requirement
const syncRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5000,
  message: "Too many sync requests. Please slow down.",
});

const getRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: "Too many get requests. Please slow down.",
});

module.exports = { syncRateLimiter, getRateLimiter };
