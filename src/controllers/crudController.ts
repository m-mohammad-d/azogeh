import { RequestHandler } from "express";
import { FilterQuery, Model, Query } from "mongoose";
import AppError from "../utils/appError";
import APIFeatures from "../utils/apiFeatures";
import { Populate } from "../types";

export const getAll = (Model: Model<any>): RequestHandler => {
  return async (req, res, next) => {
    const initialFilter: FilterQuery<any> = {};
    if (req.params.productId) initialFilter.product = req.params.productId;
    if (req.params.userId) initialFilter.user = req.params.tourId;

    const features = new APIFeatures(Model, req.query, initialFilter);

    const { pagination, skip, total } = await features.filter().search().sort().limitFields().pagination();
    if (req.query.page && skip >= total) return next(new AppError("این صفحه وجود ندارد", 404));

    const docs: Document[] = await features.query;

    return res.status(200).json({
      status: "success",
      results: docs.length,
      pagination,
      data: { docs },
    });
  };
};

export const getOne = (Model: Model<any>, populate?: Populate): RequestHandler => {
  return async (req, res, next) => {
    const query: Query<any, any> = Model.findById(req.params.id);
    if (populate) query.populate({ ...populate });

    const doc: Document = await query;
    if (!doc) return next(new AppError("هیچ موردی با این شناسه یافت نشد", 404));

    return res.status(200).json({
      status: "success",
      data: { doc },
    });
  };
};

export const createOne = (Model: Model<any>): RequestHandler => {
  return async (req, res, next) => {
    const doc: Document = await Model.create(req.body);

    return res.status(201).json({
      status: "success",
      data: { doc },
    });
  };
};

export const updateOne = (Model: Model<any>): RequestHandler => {
  return async (req, res, next) => {
    let doc: Document | null = await Model.findById(req.params.id);
    if (!doc) return next(new AppError("هیچ موردی با این شناسه یافت نشد", 404));

    doc = await Model.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      status: "success",
      data: { doc },
    });
  };
};

export const deleteOne = (Model: Model<any>): RequestHandler => {
  return async (req, res, next) => {
    const doc: Document | null = await Model.findById(req.params.id);
    if (!doc) return next(new AppError("هیچ موردی با این شناسه یافت نشد", 404));

    await Model.findOneAndDelete({ _id: req.params.id });

    return res.status(204).json({
      status: "success",
      data: null,
    });
  };
};
