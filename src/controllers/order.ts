import CrudController from "./crud";
import { Populate } from "../types";
import Order from "../models/order";
import { RequestHandler, Response } from "express";
import AppError from "../utils/appError";

class OrderController extends CrudController {
  constructor(populate?: Populate) {
    super(Order, populate);
  }

  updateOrderToPaid: RequestHandler = async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
      const msg = "هیچ موردی با این شناسه یافت  نشد";
      return next(new AppError(msg, 404));
    }

    order.isPaid = true;
    order.paidAt = new Date(Date.now());
    await order.save();

    return this.sendCrudResponse(res, order, 200);
  };

  protected override sendCrudResponse(res: Response, data: any, statusCode: number, pagination?: any) {
    res.status(statusCode).json({
      status: "success",
      results: Array.isArray(data) ? data.length : undefined,
      pagination,
      data: Array.isArray(data) ? { orders: data } : { order: data },
    });
  }
}

const orderController = new OrderController({ path: "user orderItems.product" });
export default orderController;
