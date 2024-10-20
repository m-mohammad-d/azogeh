import express from "express";
import ProductController from "../controllers/productController";

const router = express.Router();
const productController = new ProductController();

router
  //
  .route("/")
  .get(productController.getAll)
  .post(productController.createOne);

router
  //
  .route("/:id")
  .get(productController.getOne)
  .delete(productController.deleteOne);

export default router;
