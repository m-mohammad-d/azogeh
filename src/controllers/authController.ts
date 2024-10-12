import User from "../models/userModel";
import { LoginRequestHandler, SignupRequestHandler } from "../dtos";
import createSendTokenAndResponse from "../utils/createSendTokenAndResponse";
import AppError from "../utils/appError";

// @route   POST /api/v1/users/signup
// @access  Public
export const signup: SignupRequestHandler = async (req, res, next) => {
  const { name, email, password, passwordConfirmation } = req.body;

  const user = await User.create({ name, email, password, passwordConfirmation });

  return createSendTokenAndResponse(user, 201, res);
};

// @route   POST /api/v1/users/login
// @access  Public
export const login: LoginRequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) return next(new AppError("لطفا ایمیل و رمز عبور بدهید!", 400));

  const user = await User.findOne({ email }).select("+password +active");
  if (!user) return next(new AppError("ایمیل یا رمز عبور نادرست!", 401));

  if (!user.active) return next(new AppError("کاربری که به این ایمیل مرتبط است غیرفعال شده!", 404));

  const correct = await user.correctPassword(password);
  if (!correct) return next(new AppError("ایمیل یا رمز عبور نادرست!", 401));

  return createSendTokenAndResponse(user, 200, res);
};
