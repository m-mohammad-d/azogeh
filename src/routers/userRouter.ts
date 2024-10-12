import express from "express";
import * as userController from "../controllers/userController";
import * as authController from "../controllers/authController";
import * as authMiddleware from "../middlewares/authMiddleware";
import catchAsync from "../utils/catchAsync";

const router = express.Router();

//////////// @access PUBLIC ////////////

router.post("/signup", catchAsync(authController.signup));
router.post("/login", catchAsync(authController.login));

//////////// @access USERS ////////////

router.use(catchAsync(authMiddleware.protect));

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
