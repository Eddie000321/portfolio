//import express from "express";
//var express = require("express");
//var app = express();
/*import app from "./server/express.js";
import router from "./server/assets-router.js";
//const assetsRouter = require("./server/assets-router");
app.use("/src", router);
app.use("/", function (req, res) {
  res.send("Welcome to User application");
});
app.listen(3000);
console.log("Server running at http://localhost:3000/");
//module.exports = app;
export default app;
*/
 import config from "./config/config.js";
 import app from "./server/express.js";
 import mongoose from "mongoose";
 mongoose.Promise = global.Promise;
 mongoose.connect(config.mongoUri, {
   //useNewUrlParser: true,
   //useCreateIndex: true,
   //useUnifiedTopology: true
 })
 .then(() => {
  console.log("Connected to the database!");
  })
  
 mongoose.connection.on("error", () => {
   throw new Error(`unable to connect to database: ${config.mongoUri}`);
 });
 app.get("/", (req, res) => {
   res.json({ message: "Welcome to User application." });
 });
 app.listen(config.port, (err) => {
   if (err) {
     console.log(err);
   }
   console.info("Server started on port %s.", config.port);
 });
