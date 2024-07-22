import { Express } from "express";

module.exports = (app: Express) => {
  app.get("/", (req, res) => res.send("API is running..."));
};
