import axios from "axios";
import { Router } from "express";
import purchaseOrder from "../../models/purchaseOrder";
import { checkStock } from "../../middlewares/checkStock";
import * as dotenv from "dotenv";
import { verifyToken } from "../../middlewares/auth";
dotenv.config();

const router = Router();

router.post("/create-order", checkStock, verifyToken, async (req, res) => {
  const { user, compra } = req.body;

  let value = 0;
  compra.forEach((obj: Object) => {
    value = value + obj["price"];
  });
  value = (value * 100) / 100;
  let productos = compra.map((obj: Object) => {
    return {
      name: obj["name"],
      quantity: obj["cantidad"],
      price: obj["price"],
    };
  });

  const newOrder = new purchaseOrder({
    user: user["email"],
    address: {
      direccion: user["direccionEnvio"],
      localidad: user["localidad"],
      CP: user["CP"],
    },
    products: productos,
  });
  newOrder.save();
  const idOrder = newOrder["_id"];
  const id = idOrder.toString();

  try {
    const order = {
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: `${idOrder}`,
          amount: {
            currency_code: "USD",
            value: value,
          },
        },
      ],
      application_context: {
        brand_name: "Henry BarberShop",
        landing_page: "LOGIN",
        user_action: "PAY_NOW",

        return_url: `http://localhost:${process.env.PORT}/payments/capture-order`,
        cancel_url: `http://localhost:${process.env.PORT}/payments/cancel-order/${id}`,
      },
    };
    const response = await axios.post(
      "https://api-m.sandbox.paypal.com/v2/checkout/orders",
      order,
      {
        auth: {
          username: `${process.env.PAYPAL_CLIENT_ID}`,
          password: `${process.env.PAYPAL_CLIENT_SECRET}`,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).send(error);
  }
});
export default router;
