import express from "express";
import orderController from "../controllers/order";
import authMiddleware from "../middlewares/auth";
const orderRouter = express.Router();


//////////// @access PUBLIC ////////////

//////////// @access USERS ////////////
orderRouter.use(authMiddleware.protect)
orderRouter.post("/", orderController.createOne);
orderRouter.get("/:id", orderController.getOne);
orderRouter.patch("/:id", orderController.updateOne)
orderRouter.delete("/:id", orderController.deleteOne)

//////////// @access ADMIN ////////////
orderRouter.use(authMiddleware.restrictTo("admin"))
orderRouter.get("/", orderController.getAll);

export default orderRouter;
