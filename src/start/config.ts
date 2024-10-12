import path from "node:path";
import express, { Express } from "express";
import morgan from "morgan";
import ms from "ms";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import * as securityMiddleware from "../middlewares/securityMiddleware";
import { IUser } from "../types";

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}

module.exports = (app: Express) => {
  // Development Logging
  if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

  // Set security HTTP headers
  app.use(helmet());

  // Limit requests
  const limiter = rateLimit({
    windowMs: ms("15m"),
    limit: 100,
    message: "درخواست های این IP بسیار زیاد است، لطفاً یک ساعت دیگر دوباره امتحان کنید!",
  });
  app.use("/api", limiter);

  // Request's Body parser
  app.use(express.json({ limit: "5mb" }));
  app.use(express.urlencoded({ extended: false }));

  // Data sanitization against NoSQL query injection
  app.use(mongoSanitize());

  // Data sanitization against XSS
  app.use(securityMiddleware.sanitizeXSS);

  // Protect against HTTP Parameter Pollution attacks
  app.use(
    hpp({
      whitelist: ["countInStock", "brand", "category", "rating", "numReviews", "price", "discount", "discountedPrice"],
    }),
  );

  // Template Engine
  app.set("view engine", "pug");
  app.set("views", path.join(path.resolve(), "src", "views"));

  // Serving Static Files
  app.use(express.static(path.join(path.resolve(), "src", "public")));
};
