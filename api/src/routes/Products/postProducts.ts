import { Router } from "express";

import ProductModel from "../../models/products";

const router = Router();

router.post("/create", async (req, res) => {
  const { name, description, price, stock, available, favorite, categories } =
    req.body;
  try {
    const productSaved = await ProductModel.create(req.body);
    res.send(productSaved);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
