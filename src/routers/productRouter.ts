import express from "express";
import * as productController from "../controllers/productController";

const router = express.Router();

router
  //
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.createProduct);

router
  //
  .route("/:id")
  .get(productController.getProduct)
  .delete(productController.deleteProduct);

export default router;
