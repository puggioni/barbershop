import { response, Router } from "express";

import ProductModel from "../../models/products";

const router = Router();

router.get("/all", async (req, res) => {
  try {
    await ProductModel.find()
      .populate("categories", "name -_id")
      .then((products) => res.status(200).send(products));
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default router;
