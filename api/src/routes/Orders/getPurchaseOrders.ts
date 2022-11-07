import { Router } from "express";
import { isAdmin } from "../../middlewares/auth";
import Orders from "../../models/purchaseOrder";

const router = Router();

router.get("/all-orders", isAdmin, async (req, res) => {
  try {
    const orders = await Orders.find({});
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
