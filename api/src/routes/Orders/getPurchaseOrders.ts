import { Router } from "express";
import Orders from "../../models/purchaseOrder";

const router = Router();

router.get("/all", async (req, res) => {
  try {
    const orders = await Orders.find();
    res.send(orders);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default router;
