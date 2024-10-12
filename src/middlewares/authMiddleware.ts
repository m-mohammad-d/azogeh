import AppError from "../utils/appError";
import verifyToken from "../utils/verifyToken";
import User from "../models/userModel";
import { RequestHandler } from "express";

export const protect: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;
  let token: string | undefined;

  if (authorization && authorization.startsWith("Bearer")) token = authorization.split(" ")[1];
  else token = undefined;
  if (!token) return next(new AppError("شما وارد نشده اید! لطفا برای دسترسی وارد شوید", 401));

  const decoded = (await verifyToken(token)) as { id: string; iat: number; exp: number };

  const user = await User.findOne({ _id: decoded.id }).select("+active");
  if (!user) return next(new AppError("کاربر متعلق به این توکن دیگر وجود ندارد!", 401));
  if (!user.active) return next(new AppError("کاربری که به این ایمیل مرتبط است غیرفعال شده!", 404));

  if (user.changePasswordAfter(decoded.iat))
    return next(new AppError("کاربر اخیرا رمز عبور را تغییر داده است! لطفا دوباره وارد شوید.", 401));

  req.user = user;
  return next();
};

export const restrictTo = (...roles: string[]): RequestHandler => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("شما اجازه انجام این عمل را ندارید!", 403));
    }
    return next();
  };
};
