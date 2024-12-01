import express from "express";
import orderController from "../controllers/order";
import authMiddleware from "../middlewares/auth";
import orderMiddleware from "../middlewares/order";
const orderRouter = express.Router();

//////////// @access PUBLIC ////////////

//////////// @access USERS ////////////
orderRouter.use(authMiddleware.protect);
orderRouter.post("/", orderMiddleware.beforeCreate, orderController.createOne);
orderRouter.get("/:id", orderController.getOne);
orderRouter.patch("/:id", orderMiddleware.beforeUpdate, orderController.updateOne);
orderRouter.delete("/:id", orderController.deleteOne);

//////////// @access ADMIN ////////////
orderRouter.use(authMiddleware.restrictTo("admin"));
orderRouter.get("/", orderController.getAll);

export default orderRouter;
