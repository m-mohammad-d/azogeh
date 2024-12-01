import CrudController from "./crud";
import { Populate } from "../types";
import Order from "../models/order";
import { Response } from "express";

class OrderController extends CrudController {
  constructor(populate?: Populate) {
    super(Order, populate);
  }

  protected override sendCrudResponse(res: Response, data: any, statusCode: number, pagination?: any) {
    res.status(statusCode).json({
      status: "success",
      results: Array.isArray(data) ? data.length : undefined,
      pagination,
      data: Array.isArray(data) ? { orders: data } : { order: data },
    });
  }
}

const orderController = new OrderController({ path: "user orderItems.product", });
export default orderController;
