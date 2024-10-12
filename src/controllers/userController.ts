import { RequestHandler } from "express";
import User from "../models/userModel";

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
