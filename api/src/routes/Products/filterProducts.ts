import { Router } from "express";

import ProductModel from "../../models/products";

const router = Router();

router.get("/filter/:categoryName", async (req, res) => {
  const { categoryName } = req.params;
  console.log("CATEGORY", categoryName);
  const products = await ProductModel.find().populate("categories", "name");

  try {
    const respuesta = [];
    products.forEach((obj) =>
      obj.categories.forEach((el: Object) =>
        el["name"] === categoryName ? respuesta.push(obj) : false
      )
    );
    res.status(200).send(respuesta);
  } catch (error) {
    res.status(500).send(error);
  }
});
export default router;
