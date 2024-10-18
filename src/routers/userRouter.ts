import express from "express";
import * as userController from "../controllers/userController";
import * as authController from "../controllers/authController";
import * as authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

//////////// @access PUBLIC ////////////

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.post("/forgot-password", authController.forgotPassword);
router.patch("/reset-password", authController.resetPassword);

//////////// @access USERS ////////////

router.use(authMiddleware.protect);

router.get("/get-me", userController.getMe);
router.patch("/update-me", userController.updateMe);
router.patch("/update-me-password", userController.updateMePassword);
router.delete("/delete-me", userController.deleteMe);

//////////// @access ADMIN ////////////

router.use(authMiddleware.restrictTo("admin"));

router
  //
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  //
  .route("/:id")
  .get(userController.getUser)
  .delete(userController.deleteUser)
  .patch(userController.updateUser);

export default router;
