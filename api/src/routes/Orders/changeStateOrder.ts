import { Router } from "express";
import { isAdmin } from "../../middlewares/auth";
import Orders from "../../models/purchaseOrder";

const router = Router();

router.patch("/editorder", isAdmin, async (req, res) => {
  const { id, state } = req.query;
  try {
    const order = await Orders.findById(id);
    state ? (order.state = `${state}`) : "Creada";
    await order.save();
    res.status(200).send(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
