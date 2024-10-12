import { Response } from "express";
import { IUser } from "../types";
import _ from "lodash";

const createSendTokenAndResponse = (user: IUser, statusCode: number, res: Response) => {
  const token = user.signToken();

  // res.cookie("jwt", token, {
  //   expires: new Date(Date.now() + ms(process.env.JWT_COOKIE_EXPIRES_IN!)),
  //   secure: process.env.ENVIRONMENT === "production",
  //   httpOnly: true,
  // });

  // TODO: Set token into response's header

  return res.status(statusCode).json({
    status: "success",
    token,
    data: { user: _.pick(user, ["id", "name", "email", "role"]) },
  });
};

export default createSendTokenAndResponse;
