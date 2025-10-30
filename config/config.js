import dotenv from "dotenv";

dotenv.config();

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri:
    process.env.MONGODB_URI ||
    `mongodb://${process.env.MONGO_HOST || "127.0.0.1"}:${process.env.MONGO_PORT || "27017"}/Portfolio`,
};

export default config;
