import User from "../models/userModel";
import { SignupRequestHandler } from "../dtos";
import createSendTokenAndResponse from "../utils/createSendTokenAndResponse";

// @route   POST /api/v1/users/signup
// @access  Public
export const signup: SignupRequestHandler = async (req, res, next) => {
  const { name, email, password, passwordConfirmation } = req.body;

  const user = await User.create({ name, email, password, passwordConfirmation });

  return createSendTokenAndResponse(user, 201, res);
};
