import { Express } from "express";
import productRouter from "../routers/product";
import * as errorMiddleware from "../middlewares/error";
import * as errorController from "../controllers/error";
import viewRouter from "../routers/view";
import userRouter from "../routers/user";
import uploadRouter from "../routers/upload";

module.exports = (app: Express) => {
  app.use("/server", viewRouter);
  app.use("/api/products", productRouter);
  app.use("/api/users", userRouter);
  app.use("/api/upload", uploadRouter);
  app.all("*", errorMiddleware.notFound);
  app.use(errorController.globalErrorHandler);
};
