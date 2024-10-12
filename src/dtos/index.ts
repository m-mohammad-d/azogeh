import { RequestHandler } from "express";

export interface SignupRequestHandler<
  P = any,
  ResBody = any,
  ReqBody = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  },
  ReqQuery = any,
> extends RequestHandler<P, ResBody, ReqBody, ReqQuery> {}

export interface LoginRequestHandler<
  P = any,
  ResBody = any,
  ReqBody = {
    email: string;
    password: string;
  },
  ReqQuery = any,
> extends RequestHandler<P, ResBody, ReqBody, ReqQuery> {}
