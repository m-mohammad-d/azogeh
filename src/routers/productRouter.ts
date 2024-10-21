import express from "express";
import ProductController from "../controllers/productController";
import reviewRouter from "./reviewRouter";

const router = express.Router();
const productController = new ProductController();

//////////// @access PUBLIC ////////////

router.get("/", productController.getAll);
router.get("/:id", productController.getOne);

//////////// @access USERS ////////////

// router.use(authMiddleware.protect);

router.use("/:productId/reviews", reviewRouter);

//////////// @access ADMIN ////////////

// router.use(authMiddleware.restrictTo("admin"));

router.post("/", productController.createOne);
router.route("/:id").patch(productController.updateOne).delete(productController.deleteOne);

export default router;
