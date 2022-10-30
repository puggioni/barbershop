import { Router } from "express";
import Orders from "../../models/purchaseOrder";

const router = Router();

router.patch("/editorder", async (req, res) => {
  const { id, state } = req.query;

  const order = await Orders.findOne({ _id: id });
  console.log(order);
  order.save();
  res.status(200).send(order);
});

export default router;
