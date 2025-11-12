import mongoose from "mongoose";

import config from "../config/config.js";
import seedPortfolioData from "../server/helpers/seedPortfolioData.js";

const seed = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log("MongoDB connected");
    await seedPortfolioData();
    console.log("Portfolio data inserted (skipped if already present).");
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seed();
