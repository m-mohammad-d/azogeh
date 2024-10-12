import express from "express";
import * as userController from "../controllers/userController";
import * as authController from "../controllers/authController";
import catchAsync from "../utils/catchAsync";

const router = express.Router();

//////////// @access PUBLIC ////////////

router.post("/signup", catchAsync(authController.signup));

//////////// @access USERS ////////////

//////////// @access ADMIN ////////////

router
  //
  .route("/")
  .get(catchAsync(userController.getAllUsers))
  .post(catchAsync(userController.createUser));

router
  .route("/:id")
  .get(catchAsync(userController.getUser))
  .delete(catchAsync(userController.deleteUser))
  .patch(catchAsync(userController.updateUser));

export default router;
