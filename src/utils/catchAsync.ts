import { RequestHandler } from "express";

const catchAsync = (fn: Function): RequestHandler => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
