import { Router } from "express";
import Orders from "../../models/purchaseOrder";

const router = Router();

router.get("/:idOrder", async (req, res) => {
  const { idOrder } = req.params;
  try {
    const order = await Orders.findById(idOrder);
    res.status(200).send(order);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;
