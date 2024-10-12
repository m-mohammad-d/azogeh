import User from "../models/userModel";
import { ForgotPasswordRequestHandler, LoginRequestHandler, SignupRequestHandler } from "../dtos";
import createSendTokenAndResponse from "../utils/createSendTokenAndResponse";
import AppError from "../utils/appError";
import sendEmail from "../utils/email";

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

  const user = await User.findOne({ email }).select("+password +active");
  if (!user) return next(new AppError("ایمیل یا رمز عبور نادرست!", 401));

  if (!user.active) return next(new AppError("کاربری که به این ایمیل مرتبط است غیرفعال شده!", 404));

  const correct = await user.correctPassword(password);
  if (!correct) return next(new AppError("ایمیل یا رمز عبور نادرست!", 401));

  return createSendTokenAndResponse(user, 200, res);
};

// @route   POST /api/v1/users/forgot-password
// @access  Public
export const forgotPassword: ForgotPasswordRequestHandler = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email }).select("+active");
  if (!user) return next(new AppError("هیچ کاربری با این آدرس ایمیل وجود ندارد.", 404));
  if (!user.active) return next(new AppError("کاربری که به این ایمیل مرتبط است غیرفعال شده است.", 401));

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // const resetURL = `${req.protocol}://${req.get("host")}/api/v1/users/reset-password/${resetToken}`;
  const message = `Reset Token: ${resetToken}`;

  try {
    await sendEmail(email, message, "درخواست برای ریست کردن رمز عبور");

    return res.status(200).json({
      status: "success",
      message: "رمز با موفقیت به ایمیل ارسال شد!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError("در ارسال ایمیل خطایی روی داد. لطفا بعدا دوباره امتحان کنید!", 500));
  }
};
