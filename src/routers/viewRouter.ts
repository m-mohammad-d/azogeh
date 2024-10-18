import express, { Request, Response } from "express";
import Products from "../models/productModel";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const products = await Products.find();

  res.status(200).render("layout", {
    title: "آذوقه",
    products,
  });
});

export default router;
