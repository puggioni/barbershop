import { Router } from "express";
import Orders from "../../models/purchaseOrder";

const router = Router();

router.get("/cancel-order", async (req, res) => {
  const { idOrder } = req.query;
  try {
    const order = await Orders.findById(idOrder);
    order["state"] = "Cancelada";
    order.save();
    res.status(200).send(order);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;
