import { Router } from "express";

import ProductModel from "../../models/products";

const router = Router();

router.get("/", async (req, res) => {
  let {
    filterBarberTools,
    filterHairProduct,
    filterSkinProduct,
    filterBeardProduct,
  } = req.query;

  const products = await ProductModel.find().populate("categories", "name");
  console.log(products);
  if (filterBarberTools) {
    try {
      const respuesta = [];
      const resolve = products.forEach((obj) =>
        obj.categories.forEach((el: Object) =>
          el["name"] === "barbertool" ? respuesta.push(obj) : false
        )
      );
      console.log("RESPUESTA", respuesta);
      res.send(respuesta);
    } catch (error) {
      res.status(500).send(error);
    }
  } else if (filterHairProduct) {
    try {
      const respuesta = [];
      const resolve = products.forEach((obj) =>
        obj.categories.forEach((el: Object) =>
          el["name"] === "Hairproduct" ? respuesta.push(obj) : false
        )
      );
      console.log("RESPUESTA", respuesta);
      res.send(respuesta);
    } catch (error) {
      res.status(500).send(error);
    }
  } else if (filterSkinProduct) {
    try {
      const respuesta = [];
      const resolve = products.forEach((obj) =>
        obj.categories.forEach((el: Object) =>
          el["name"] === "Skinproduct" ? respuesta.push(obj) : false
        )
      );
      console.log("RESPUESTA", respuesta);
      res.send(respuesta);
    } catch (error) {
      res.status(500).send(error);
    }
  } else if (filterBeardProduct) {
    try {
      const respuesta = [];
      const resolve = products.forEach((obj) =>
        obj.categories.forEach((el: Object) =>
          el["name"] === "Beardproduct" ? respuesta.push(obj) : false
        )
      );
      console.log("RESPUESTA", respuesta);
      res.send(respuesta);
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(200).send(products);
  }
});
export default router;
