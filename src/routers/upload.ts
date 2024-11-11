import express from "express";
import * as uploadController from "../controllers/upload";
import * as uploadMiddleware from "../middlewares/upload";

const router = express.Router();

router.post("/", uploadMiddleware.upload.single("image"), uploadController.upload);

export default router;
