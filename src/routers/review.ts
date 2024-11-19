import express from "express";
import Review from "../controllers/review";
import * as reviewMiddleware from "../middlewares/review";
import * as authMiddleware from "../middlewares/auth";

const router = express.Router({ mergeParams: true });
const reviewController = new Review();

//////////// @access PUBLIC ////////////

router.get("/", reviewController.getAll);
router.get("/:id", reviewController.getOne);

//////////// @access USERS ////////////

router.use(authMiddleware.protect);

router.post("/", reviewMiddleware.setIds, reviewController.createOne);
router.patch("/:id", reviewController.updateOne);
router.delete("/:id", reviewController.deleteOne);

export default router;
