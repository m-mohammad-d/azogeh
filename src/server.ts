require("dotenv").config();
import { Express } from "express";

const app = require("express")() as Express;

process.on("uncaughtException", err => {
  console.log(err.message);
  console.log("❌ Uncaught Exception! Shutting down...");
  process.exit(1);
});

require("./start/db")();
require("./start/config")(app);
require("./start/routes")(app);

const port = process.env.PORT || 3000;
let server = app.listen(port, () => console.log(`Server running on port ${port}`));

process.on("unhandledRejection", err => {
  console.log((err as Error).message);
  console.log("❌ Unhandled Rejection! Shutting down...");
  server.close(() => process.exit(1));
});
