import express from "express";
import Product from "../controllers/product";
import reviewRouter from "./review";
import * as authMiddleware from "../middlewares/auth";

const router = express.Router();
const productController = new Product();
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
