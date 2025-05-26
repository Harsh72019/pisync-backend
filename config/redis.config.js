const { Redis } = require("ioredis");
const envConfig = require("./env.config");

const redis = new Redis({
  host: envConfig.redisHost || "localhost",
  port: envConfig.redisPort || 6379,
  //  url: envConfig.redisUrl ,
  maxRetriesPerRequest: null,
});

redis.on("connect", () => {
  console.log("✅ Redis connected successfully.");
});

redis.on("error", (err) => {
  console.error("❌ Redis connection error:", err);
});

module.exports = redis;
