import { Response } from "express";
import CrudController from "./crudController";
import { Populate } from "../types";
import Product from "../models/productModel";

export default class ProductController extends CrudController {
  constructor(populate?: Populate) {
    super(Product, populate);
  }

  protected override sendCrudResponse(res: Response, data: any, statusCode: number, pagination?: any) {
    res.status(statusCode).json({
      status: "success",
      results: Array.isArray(data) ? data.length : undefined,
      pagination,
      data: Array.isArray(data) ? { products: data } : { product: data },
    });
  }
}
