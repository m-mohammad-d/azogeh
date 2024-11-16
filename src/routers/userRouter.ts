import express from "express";
import UserController from "../controllers/userController";
import * as authController from "../controllers/authController";
import * as authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();
const userController = new UserController();

//////////// @access PUBLIC ////////////

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
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
  .get(userController.getAll)
  .post(userController.createOne);

router
  //
  .route("/:id")
  .get(userController.getOne)
  .delete(userController.deleteOne)
  .patch(userController.updateOne);

export default router;
