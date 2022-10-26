import axios from "axios";
import { Router } from "express";
import purchaseOrder from "../../models/purchaseOrder";
import { checkStock } from "../../middlewares/checkStock";
import { verifyToken } from "../../middlewares/auth";
import { deleteStock } from "../../middlewares/deleteStock";
import * as dotenv from "dotenv";
dotenv.config();

const router = Router();

router.post("/create-order", async (req, res) => {
  const { user, compra } = req.body;
  let value = compra.reduce((acc: any, curr: any) => {
    return acc["price"] + curr["price"];
  });
  console.log(value);
  let productos = compra.map((obj: Object) => {
    return { id: obj["id"], quantity: obj["cantidad"] };
  });

  const newOrder = new purchaseOrder({
    user: { id: user["user"] },
    products: productos,
  });
  console.log(newOrder);
  newOrder.save();
  const idOrder = newOrder["_id"];
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
        return_url: `${process.env.CLIENT_URL}/payments/capture-order`,
        cancel_url: `${process.env.CLIENT_URL}/payments/cancel-order`,
      },
    };
    const response = await axios.post(
      "https://api-m.sandbox.paypal.com/v2/checkout/orders",
      order,
      {
        auth: {
          username:
          `${process.env.PAYPAL_CLIENT_ID}`,
          password:
          `${process.env.PAYPAL_CLIENT_SECRET}`,
        },
      }
    );
    //deleteStock(products);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).send(error);
  }
});
export default router;
