import express from "express";
import productController from "../controllers/product";
import reviewRouter from "./review";
import authMiddleware from "../middlewares/auth";

const productRouter = express.Router();

productRouter.use("/:productId/reviews", reviewRouter);

//////////// @access PUBLIC ////////////

productRouter.get("/", productController.getAll);
productRouter.get("/:id", productController.getOne);

//////////// @access USERS ////////////

productRouter.use(authMiddleware.protect);

//////////// @access ADMIN ////////////

productRouter.use(authMiddleware.restrictTo("admin"));

productRouter.post("/", productController.createOne);
productRouter.patch("/:id", productController.updateOne);
productRouter.delete("/:id", productController.deleteOne);

export default productRouter;
