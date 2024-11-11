import express from "express";
import ProductController from "../controllers/productController";
import reviewRouter from "./reviewRouter";
import * as authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();
const productController = new ProductController();
router.use("/:productId/reviews", reviewRouter);

//////////// @access PUBLIC ////////////

router.get("/", productController.getAll);
router.get("/:id", productController.getOne);

//////////// @access USERS ////////////

router.use(authMiddleware.protect);

//////////// @access ADMIN ////////////

router.use(authMiddleware.restrictTo("admin"));

router.post("/", productController.createOne);
router.patch("/:id", productController.updateOne);
router.delete("/:id", productController.deleteOne);

export default router;
