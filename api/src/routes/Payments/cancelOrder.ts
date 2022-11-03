import { Router } from "express";
import Orders from "../../models/purchaseOrder";
import * as dotenv from "dotenv";
dotenv.config();

const router = Router();

router.get("/cancel-order/:idOrder", async (req, res) => {
  const { idOrder } = req.params;

  try {
    res.redirect(`${process.env.CLIENT_URL}/products/cancelacion/${idOrder}`);
  } catch (error) {
    console.log(error);
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;
