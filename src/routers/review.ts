import express from "express";
import reviewController from "../controllers/review";
import reviewMiddleware from "../middlewares/review";
import authMiddleware from "../middlewares/auth";

const reviewRouter = express.Router({ mergeParams: true });

//////////// @access PUBLIC ////////////

reviewRouter.get("/", reviewController.getAll);
reviewRouter.get("/:id", reviewController.getOne);

//////////// @access USERS ////////////

reviewRouter.use(authMiddleware.protect);

reviewRouter.post("/", reviewMiddleware.setIds, reviewController.createOne);
reviewRouter.patch("/:id", reviewController.updateOne);
reviewRouter.delete("/:id", reviewController.deleteOne);

export default reviewRouter;
