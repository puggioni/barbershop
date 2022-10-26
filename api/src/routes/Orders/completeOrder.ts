import { Router } from "express";
import Orders from "../../models/purchaseOrder";

const router = Router();

router.get("/complete-order", async (req, res) => {
  const { idOrder } = req.query;
  try {
    const order = await Orders.findById(idOrder);
    order["state"] = "Completa";
    order.save();
    res.status(200).send(order);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;
