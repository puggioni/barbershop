import { Router } from "express";

import ProductModel from "../../models/products";

const router = Router();

router.get("/all", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.send(products);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
