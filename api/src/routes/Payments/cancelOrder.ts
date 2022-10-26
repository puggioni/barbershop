import { Router } from "express";
import Orders from "../../models/purchaseOrder";
import * as dotenv from "dotenv";
dotenv.config();

const router = Router();

router.get("/cancel-order", async (req, res) => {
  const { idOrder } = req.query;
  try {
    const order = await Orders.findById(idOrder);
    order["state"] = "Cancelada";
    order.save();
    res.send(order).redirect(`${process.env.CLIENT_URL}/product`);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;
