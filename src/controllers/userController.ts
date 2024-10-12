import { RequestHandler } from "express";
import User from "../models/userModel";
import { UpdateMePasswordRequestHandler, UpdateMeRequestHandler } from "../dtos";
import AppError from "../utils/appError";
import _ from "lodash";
import createSendTokenAndResponse from "../utils/createSendTokenAndResponse";

// @route   GET /api/v1/users/get-me
// @access  USERS
export const getMe: RequestHandler = async (req, res, next) => {
  return res.status(200).json({
    status: "success",
    data: { user: _.pick(req.user, ["id", "name", "email", "role"]) },
  });
};

// @route   PATCH /api/v1/users/update-me
// @access  USERS
export const updateMe: UpdateMeRequestHandler = async (req, res, next) => {
  const { name, email, password, passwordConfirmation } = req.body;

  if (password || passwordConfirmation)
    return next(new AppError("با این درخواست نمی توانید رمز عبور را آپدیت کنید", 400));

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  );

  return res.status(200).json({
    status: "success",
    data: { user: _.pick(updatedUser, ["id", "name", "email", "role"]) },
  });
};

// @route   PATCH /api/v1/users/update-me-password
// @access  USERS
export const updateMePassword: UpdateMePasswordRequestHandler = async (req, res, next) => {
  const { passwordCurrent, password, passwordConfirmation } = req.body;

  const user = await User.findById(req.user._id).select("+password");

  const correct = await user!.correctPassword(passwordCurrent);
  if (!correct) return next(new AppError("رمز عبور فعلی شما اشتباه است", 401));

  user!.password = password;
  user!.passwordConfirmation = passwordConfirmation;
  await user!.save();

  return createSendTokenAndResponse(user!, 200, res);
};

// @route   DELETE /api/v1/users/delete-me
// @access  USERS
export const deleteMe: RequestHandler = async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });

  return res.status(204).json({
    status: "success",
    data: null,
  });
};

//////////////////////// CRUD ////////////////////////

// @route   GET   /api/v1/users
// @access  ADMIN
export const getAllUsers: RequestHandler = async (req, res, next) => {
  const users = await User.find();

  return res.status(200).json({
    status: "success",
    results: users.length,
    data: { users },
  });
};

// @route   GET   /api/v1/users/1
// @access  ADMIN
export const getUser: RequestHandler = (req, res, next) => {
  return res.status(500).json({
    status: "error",
    message: "این مسیر هنوز اوکی نشده است!",
  });
};

// @route   POST  /api/v1/users
// @access  ADMIN
export const createUser: RequestHandler = (req, res, next) => {
  return res.status(500).json({
    status: "error",
    message: "این مسیر هنوز اوکی نشده است!",
  });
};

// @route   PATCH   /api/v1/users/1
// @access  ADMIN
export const updateUser: RequestHandler = (req, res, next) => {
  return res.status(500).json({
    status: "error",
    message: "این مسیر هنوز اوکی نشده است!",
  });
};

// @route   DELETE  /api/v1/users/1
// @access  ADMIN
export const deleteUser: RequestHandler = (req, res, next) => {
  return res.status(500).json({
    status: "error",
    message: "این مسیر هنوز اوکی نشده است!",
  });
};
