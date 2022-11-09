import { Router } from "express";
import axios from "axios";
const router = Router();
import * as dotenv from "dotenv";

dotenv.config();

router.get("/capture-order", async (req, res) => {
  const { token, PayerID } = req.query;

  const response = await axios.post(
    `https://api-m.sandbox.paypal.com/v2/checkout/orders/${token}/capture`,
    {},
    {
      auth: {
        username: `${process.env.PAYPAL_CLIENT_ID}`,
        password: `${process.env.PAYPAL_CLIENT_SECRET}`,
      },
    }
  );

  const idOrder = response.data.purchase_units[0].reference_id;

  res
    .status(200)
    .redirect(`https://barbershop-front-deploy.vercel.app/products/confirmacion/${idOrder}`);
});

export default router;
