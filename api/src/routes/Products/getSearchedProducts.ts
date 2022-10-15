import { Router } from "express";

import ProductModel from "../../models/products";

const router = Router();

router.get("/search", async (req, res) => {
  let { name } = req.query;
  if(typeof(name) === 'string')
    name = name.toLocaleLowerCase();
  try {
    const products = await ProductModel.find({ name: { $regex: '.*' + name + '.*' } });
    res.send(products);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
