import express from "express";

const router = express.Router();
import * as productController from "../controllers/productController";
import catchAsync from "../middlewares/catchAsync";

router
  //
  .route("/")
  .get(catchAsync(productController.getAllProducts))
  .post(catchAsync(productController.createProduct));

router
  //
  .route("/:id")
  .get(catchAsync(productController.getProduct))
  .delete(catchAsync(productController.deleteProduct));

export default router;
