import { Express } from "express";
import productRouter from "../routers/productRouter";
import AppError from "../utils/appError";
import globalErrorHandler from "../controllers/errorController";

module.exports = (app: Express) => {
  app.use("/api/products", productRouter);

  // Unhandled Routes
  app.all("*", (req, res, next) => {
    const message = `Can't find ${req.originalUrl} on the server`;
    next(new AppError(message, 404));
  });

  app.use(globalErrorHandler);
};
