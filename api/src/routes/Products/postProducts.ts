import { Category } from "./../../models/categories";
import { Router } from "express";

import ProductModel from "../../models/products";

const router = Router();

router.post("/create", async (req, res) => {
  const { name, description, price, stock, available, favorite, categories } =
    req.body;
  try {
    const response = await ProductModel.create({
      name: name,
      description: description,
      price: price,
      stock: stock,
      available: available,
      favorite: favorite,
    });
    const finalResponse = await response.populate("categories");
    res.status(201).json(finalResponse);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
