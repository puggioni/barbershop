import { isAccessor } from "typescript";
import Product from "../models/products";

export const checkStock = async (req: any, res: any, next) => {
  const { products } = req.body;
  let error = 0;
  products.reduce(async (acc: any, prod: Object) => {
    const producto = await Product.findById(prod["productos"]["_id"]);
    if (prod["cantidad"] > producto.stock) {
      error++;
      return producto;
    }
  }, []);

  setTimeout(function () {
    if (error === 0) {
      next();
    } else {
      return res.status(500).send("No hay stock");
    }
  }, 1000);
};
