import { RequestHandler } from "express";

const setIds: RequestHandler = (req, res, next) => {
  req.body.user = req.body.userId || req.user._id;
  req.body.product = req.body.productId || req.params.productId;
  next();
};

const reviewMiddleware = { setIds };
export default reviewMiddleware;
