import mongoose from "mongoose";

import config from "./config/config.js";
import app from "./server/express.js";

mongoose.Promise = global.Promise;

mongoose
  .connect(config.mongoUri)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err.message);
});

app.get("/", (_req, res) => {
  res.send("Server is running...");
});

app.listen(config.port, (err) => {
  if (err) {
    console.error(err);
  }
  console.info(`Server started on port ${config.port}.`);
});
