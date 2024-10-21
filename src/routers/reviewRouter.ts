import express from "express";
import ReviewController from "../controllers/reviewController";
import * as reviewMiddleware from "../middlewares/reviewMiddleware";

const router = express.Router({ mergeParams: true });
const reviewController = new ReviewController();

router
  //
  .route("/")
  .get(reviewController.getAll)
  .post(reviewMiddleware.setIds, reviewController.createOne);

router
  //
  .route("/:id")
  .get(reviewController.getOne)
  .patch(reviewController.updateOne)
  .delete(reviewController.deleteOne);

export default router;
