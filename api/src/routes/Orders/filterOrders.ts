import { Router } from "express";

import Orders from "../../models/purchaseOrder";

const router = Router();

router.get("/filter-orders", async (req, res) => {
  const { state } = req.query;
  try {
    const orders = await Orders.find({ state: `${state}` });
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
