import express, { Express } from "express";
import morgan from "morgan";
import path from "node:path";
import { IUser } from "../types";

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}

module.exports = (app: Express) => {
  // Parsing Request
  app.use(express.json());

  // Development Logging
  if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

  // Template Engine
  app.set("view engine", "pug");
  app.set("views", path.join(path.resolve(), "src", "views"));

  // Serving Static Files
  app.use(express.static(path.join(path.resolve(), "src", "public")));
};
