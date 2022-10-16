import { Router } from "express";

import ProductModel from "../../models/products";

const router = Router();

router.get("/:idProduct", async (req, res) => {
    const { idProduct } = req.params;
  try {
    const product = await ProductModel.findById(idProduct);
    res.send(product);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;