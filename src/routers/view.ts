import express, { Request, Response } from "express";
import Products from "../models/product";

const viewRouter = express.Router();

viewRouter.get("/", async (req: Request, res: Response) => {
  const products = await Products.find();

  res.status(200).render("layout", {
    title: "آذوقه",
    products,
  });
});

export default viewRouter;
