import { Router } from "express";

import ProductModel from "../../models/products";
import { verifyToken, isAdmin } from "../Auth/middlewares";

const router = Router();

router.post("/create", verifyToken, isAdmin, async (req, res) => {
  const { name, description, price, stock, available, favorite, categories } =
    req.body;
  try {
    const response = await ProductModel.create({
      name: name,
      description: description,
      price: price,
      stock: stock,
      available: available,
      categories: categories,
    });
    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default router;
