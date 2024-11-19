import { RequestHandler, Response } from "express";
import { Document, FilterQuery, Model, Query } from "mongoose";
import AppError from "../utils/appError";
import APIFeatures from "../utils/apiFeatures";
import { Populate } from "../types";
import catchAsync from "../utils/catchAsync";
import Review from "../models/review";
import User from "../models/user";

abstract class CrudController {
  private readonly Model: Model<any>;
  private readonly populate?: Populate;

  protected constructor(Model: Model<any>, populate?: Populate) {
    this.Model = Model;
    this.populate = populate;
  }

  getAll: RequestHandler = catchAsync(async (req, res, next) => {
    const filter: FilterQuery<any> = {};
    if (req.params.productId) filter.product = req.params.productId;
    if (req.params.userId) filter.user = req.params.userId;

    const features = new APIFeatures(this.Model, req.query, filter);
    const { pagination, skip, total } = await features.filter().search().sort().limitFields().pagination();
    if (req.query.page && skip >= total) return next(new AppError("این صفحه وجود ندارد", 404));

    const docs: Document[] = await features.query;

    return this.sendCrudResponse(res, docs, 200, pagination);
  });

  getOne: RequestHandler = catchAsync(async (req, res, next) => {
    const query: Query<any, any> = this.Model.findById(req.params.id);

    if (this.populate) query.populate({ ...this.populate });

    const doc: Document = await query;
    if (!doc) return next(new AppError("هیچ موردی با این شناسه یافت نشد", 404));

    return this.sendCrudResponse(res, doc, 200);
  });

  createOne: RequestHandler = catchAsync(async (req, res, next) => {
    const doc: Document = await this.Model.create(req.body);
    return this.sendCrudResponse(res, doc, 201);
  });

  updateOne: RequestHandler = catchAsync(async (req, res, next) => {
    let doc: Document | null = await this.Model.findById(req.params.id);
    if (!doc) return next(new AppError("هیچ موردی با این شناسه یافت نشد", 404));

    if (doc instanceof Review) {
      if (!(req.user.role === "admin") && !(doc.user.email === req.user.email))
        return next(new AppError("شما نمی توانید نظر دیگران را آپدیت کنید", 401));
    }

    const data = await this.Model.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });

    return this.sendCrudResponse(res, data, 200);
  });

  deleteOne: RequestHandler = catchAsync(async (req, res, next) => {
    const doc: Document | null = await this.Model.findById(req.params.id);
    if (!doc) {
      return next(new AppError("هیچ موردی با این شناسه یافت نشد", 404));
    }

    if (doc instanceof Review) {
      if (!(req.user.role === "admin") && !(doc.user.email === req.user.email)) {
        return next(new AppError("شما نمی توانید نظر دیگران را حذف کنید", 401));
      }
    }

    if (doc instanceof User) {
      if (doc.email === req.user.email) {
        return next(new AppError("شما نمی توانید حساب خود را حذف کنید", 401));
      }
    }

    await this.Model.findOneAndDelete({ _id: req.params.id });

    return this.sendCrudResponse(res, null, 204);
  });

  protected abstract sendCrudResponse(res: Response, data: any, statusCode: number, pagination?: any): void;
}

export default CrudController;
