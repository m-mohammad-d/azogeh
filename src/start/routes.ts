import { Express } from "express";
import productRouter from "../routers/productRouter";
import * as errorMiddleware from "../middlewares/errorMiddleware";
import * as errorController from "../controllers/errorController";
import viewRouter from "../routers/viewRouter";
import userRouter from "../routers/userRouter";

module.exports = (app: Express) => {
  app.use("/server", viewRouter);
  app.use("/api/products", productRouter);
  app.use("/api/users", userRouter);
  app.all("*", errorMiddleware.notFound);
  app.use(errorController.globalErrorHandler);
};
