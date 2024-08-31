import { RequestHandler } from "express";
import Product from "../models/productModel";
import APIFeatures from "../utils/apiFeatures";
import AppError from "../utils/appError";

export const getAllProducts: RequestHandler = async (req, res, next) => {
  const features = new APIFeatures(Product, req.query);
  const { pagination, total, skip, page } = await features.filter().search().sort().limitFields().pagination();

  if (page) if (skip >= total) return next(new AppError("این صفحه وجود ندارد", 400));

  const products = await features.query;

  return res.status(200).json({
    status: "success",
    results: products.length,
    pagination,
    data: { products },
  });
};

export const getProduct: RequestHandler = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new AppError("هیچ محصولی با این شناسه یافت نشد.", 404));

  res.status(200).json({
    status: "success",
    product,
  });
};

export const createProduct: RequestHandler = async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(200).json({
    status: "success",
    data: product,
  });
};

export const deleteProduct: RequestHandler = async (req, res, next) => {
  const product = await Product.findByIdAndRemove(req.params.id);
  if (!product) return next(new AppError("هیچ محصولی با این شناسه یافت نشد.", 404));

  res.status(204).json({
    status: "success",
    data: null,
  });
};
