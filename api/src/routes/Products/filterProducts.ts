import { Router } from "express";

import ProductModel from "../../models/products";

const router = Router();

router.get("/filter/:categoryName", async (req, res) => {
  const { categoryName } = req.params;
  const query = req.query;

  const arrayQuery = [];

  for (let property in query) {
    if (property === "stock" || property === "price") {
      arrayQuery.push({ [property]: Number(query[property]) });
    } else {
      arrayQuery.push({ [property]: query[property] });
    }
  }

  const products = await ProductModel.find().populate("categories", "name");

  try {
    let respuesta = [];
    products.forEach((obj) =>
      obj.categories.forEach((el: Object) =>
        el["name"] === categoryName ? respuesta.push(obj) : false
      )
    );
    if (arrayQuery.length === 0) {
      res.status(200).send(respuesta);
    } else {
      arrayQuery.forEach((obj: Object) => {
        if (Object.keys(obj)[0] === "price") {
          respuesta = respuesta.filter((el: Object) => {
            return el["price"] >= Object.values(obj)[0];
          });
        }
        if (Object.keys(obj)[0] === "stock") {
          respuesta = respuesta.filter((el: Object) => {
            return el["stock"] >= Object.values(obj)[0];
          });
        }
        if (Object.keys(obj)[0] === "available") {
          respuesta = respuesta.filter((el: Object) => {
            return (el["available"] = Object.values(obj)[0]);
          });
        }
        if (Object.keys(obj)[0] === "name-asc") {
          respuesta = respuesta.sort((a: Object, b: Object) => {
            return a["name"].localeCompare(b["name"]);
          });
        }
        if (Object.keys(obj)[0] === "name-desc") {
          respuesta = respuesta.sort((a: Object, b: Object) => {
            return b["name"].localeCompare(a["name"]);
          });
        }
        if (Object.keys(obj)[0] === "price-asc") {
          respuesta = respuesta.sort((a: Object, b: Object) => {
            return a["price"] - b["price"];
          });
        }
        if (Object.keys(obj)[0] === "price-desc") {
          respuesta = respuesta.sort((a: Object, b: Object) => {
            return b["price"] - a["price"];
          });
        }
      });

      res.status(200).send(respuesta);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
export default router;
