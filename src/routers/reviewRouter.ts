import express from "express";
import ReviewController from "../controllers/reviewController";
import * as reviewMiddleware from "../middlewares/reviewMiddleware";
import * as authMiddleware from "../middlewares/authMiddleware";

const router = express.Router({ mergeParams: true });
const reviewController = new ReviewController();

//////////// @access PUBLIC ////////////

router.get("/", reviewController.getAll);
router.get("/:id", reviewController.getOne);

//////////// @access USERS ////////////

router.use(authMiddleware.protect);

router.post("/", reviewMiddleware.setIds, reviewController.createOne);
router.patch("/:id", reviewController.updateOne);
router.delete("/:id", reviewController.deleteOne);

export default router;
