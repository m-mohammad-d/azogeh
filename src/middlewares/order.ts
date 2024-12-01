import { RequestHandler } from "express";

const beforeCreate: RequestHandler = (req, res, next) => {
  req.body = {
    user: req.user._id,
    orderItems: req.body.orderItems,
    shippingAddress: req.body.shippingAddress,
    paymentMethod: req.body.paymentMethod,
    itemsPrice: req.body.itemsPrice,
    shippingPrice: req.body.shippingPrice,
    taxPrice: req.body.taxPrice,
    totalPrice: req.body.totalPrice,
  };
  next();
};

const beforeUpdate: RequestHandler = (req, res, next) => {
  req.body = {
    orderItems: req.body.orderItems,
    shippingAddress: req.body.shippingAddress,
    paymentMethod: req.body.paymentMethod,
    itemsPrice: req.body.itemsPrice,
    shippingPrice: req.body.shippingPrice,
    taxPrice: req.body.taxPrice,
    totalPrice: req.body.totalPrice,
  };
  next();
};

const orderMiddleware = { beforeCreate, beforeUpdate };
export default orderMiddleware;
