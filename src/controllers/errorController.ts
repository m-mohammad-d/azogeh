import { ErrorRequestHandler, Response } from "express";
import AppError from "../utils/appError";

interface IAppError extends Error {
  statusCode: number;
  status: string;
  isOperational?: boolean;
  path?: string;
  value?: string;
  keyValue?: any;
  errors?: any;
  code?: number;
}

////////////////////////////////

const sendErrorDev = (err: IAppError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: IAppError, res: Response) => {
  // Trusted Errors
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Unknown Errors
  console.log("❌ ERROR: ", err);
  return res.status(500).json({
    status: "error",
    message: "یک چیزی خیلی اشتباه پیش رفت",
  });
};

////////////////////////////////

const handleCastError = (error: IAppError) => {
  const message = `Invalid ${error.path}: ${error.value}`;

  return new AppError(message, 400);
};

const handleDuplicateFields = (error: IAppError) => {
  const message = `Duplicate field value: "${error.keyValue.name}" Please use another value`;

  return new AppError(message, 400);
};

const handleValidationError = (error: IAppError) => {
  const messages = Object.values(error.errors).map((obj: any) => obj.message);
  const message = `Invalid input data: ${messages.join(". ")}`;

  return new AppError(message, 400);
};

const handleJWTTokenError = () => {
  const message = "رمز نامعتبر لطفا دوباره وارد شوید!";

  return new AppError(message, 401);
};

const handleJWTExpiredError = () => {
  const message = "توکن شما منقضی شده است! لطفا دوباره وارد شوید!";

  return new AppError(message, 401);
};

////////////////////////////////

const globalErrorHandler: ErrorRequestHandler = (err: IAppError, req, res, next) => {
  const environment = process.env.NODE_ENV;
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (environment === "development") return sendErrorDev(err, res);

  if (environment === "production") {
    let error = JSON.parse(JSON.stringify(err));
    error.message = err.message;

    // Mongoose Errors
    if (error.name === "CastError") error = handleCastError(error);
    if (error.code === 11000) error = handleDuplicateFields(error);
    if (error.name === "ValidationError") error = handleValidationError(error);

    // JWT Errors
    if (error.name === "JsonWebTokenError") error = handleJWTTokenError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

    return sendErrorProd(error, res);
  }
};

export default globalErrorHandler;
