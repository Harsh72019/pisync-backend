const envConfig = require("../config/env.config");

module.exports = (err, req, res, next) => {
  console.error("❌ Error caught:", err.message);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    error: err.message || "Internal Server Error",
    stack: envConfig.nodeEnv === "production" ? undefined : err.stack,
  });
};
