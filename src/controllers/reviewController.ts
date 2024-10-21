import CrudController from "./crudController";
import Review from "../models/reviewModel";
import { Populate } from "../types";
import { Response } from "express";

export default class ReviewController extends CrudController {
  constructor(populate?: Populate) {
    super(Review as any, populate);
  }

  protected override sendCrudResponse(res: Response, data: any, statusCode: number, pagination?: any) {
    res.status(statusCode).json({
      status: "success",
      results: Array.isArray(data) ? data.length : undefined,
      pagination,
      data: Array.isArray(data) ? { reviews: data } : { review: data },
    });
  }
}