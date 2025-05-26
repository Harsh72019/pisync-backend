const mongoose = require("mongoose");
const env = require("./env.config");

const connectDB = async () => {
  try {
    await mongoose.connect(env.mongoUri, {
      maxPoolSize: 100,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
