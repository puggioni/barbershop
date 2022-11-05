import { Router } from "express";
import Orders from "../../models/purchaseOrder";
import Products from "../../models/products";
const router = Router();

router.get("/product-orders/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  const product = await Products.findById(idProduct);
  console.log(product);
  try {
    const orders = await Orders.find({});
    let productOrders = [];
    const products = orders.forEach((obj: Object) => {
      obj["products"].forEach((prod: Object) => {
        if (prod["name"] === product.name) {
          productOrders.push(obj);
        }
      });
    });
    res.status(200).send(productOrders);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
