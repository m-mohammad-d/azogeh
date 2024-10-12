import { ErrorRequestHandler, Response } from "express";
import { CastError } from "mongoose";
import AppError from "../utils/appError";
import { OperationalError } from "../types";

const sendErrorDev = (err: OperationalError | any, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: OperationalError | any, res: Response) => {
  // Trusted Errors
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Unknown Errors
  console.error("🔹Unknown Error: ", err);
  return res.status(500).json({
    status: "error",
    message: "یک چیزی خیلی اشتباه پیش رفت",
  });
};

////////////////////////////////

const handleCastError = (err: CastError) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFields = (err: any) => {
  const msg = " قبلا ثبت شده است، لطفا از آدرس ایمیل دیگری استفاده کنید " + `(${err.keyValue.email})` + " این ایمیل ";
  return new AppError(msg, 400);
};

const handleValidationError = (err: any) => {
  const messages: string[] = Object.values(err.errors).map((error: any) => error.message);
  const message = `${messages.join(" - ")}`;
  return new AppError(message, 400);
};

const handleJWTTokenError = () => {
  const message = "توکن نامعتبر است! لطفا دوباره وارد شوید!";
  return new AppError(message, 401);
};

const handleJWTExpiredError = () => {
  const message = "توکن شما منقضی شده است! لطفا دوباره وارد شوید!";
  return new AppError(message, 401);
};

////////////////////////////////

export const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Mongoose Errors
  if (err.name === "CastError") err = handleCastError(err);
  if (err.code === 11000) err = handleDuplicateFields(err);
  if (err.name === "ValidationError") err = handleValidationError(err);

  // JWT Errors
  if (err.name === "JsonWebTokenError") err = handleJWTTokenError();
  if (err.name === "TokenExpiredError") err = handleJWTExpiredError();

  if (process.env.NODE_ENV === "development") return sendErrorDev(err, res);
  else return sendErrorProd(err, res);
};
