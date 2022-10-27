import { Router } from "express";
import Orders from "../../models/purchaseOrder";

const router = Router();

router.get("/cancel-order/:idOrder", async (req, res) => {
  const { idOrder } = req.params;
  console.log(
    "🚀 ~ file: cancelOrder.ts ~ line 8 ~ router.get ~ idOrder",
    idOrder
  );

  try {
    res.redirect(`${process.env.PORT_FRONT}products/cancelacion/${idOrder}`);
  } catch (error) {
    console.log(error);
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;
