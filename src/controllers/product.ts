import { Response } from "express";
import Crud from "./crud";
import { Populate } from "../types";
import Product from "../models/product";

export default class Product extends Crud {
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
