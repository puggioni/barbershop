import axios from "axios";
import { Router } from "express";
import purchaseOrder from "../../models/purchaseOrder";
import { checkStock } from "../../middlewares/checkStock";
import { verifyToken } from "../../middlewares/auth";
import { deleteStock } from "../../middlewares/deleteStock";
const router = Router();

router.post("/create-order", async (req, res) => {
  const { user, compra } = req.body;
  let value = compra.reduce((acc: any, curr: any) => {
    return acc["price"] + curr["price"];
  });
  let productos = compra.map((obj: Object) => {
    return { id: obj["id"], quantity: obj["cantidad"] };
  });

  const newOrder = new purchaseOrder({
    user: { id: user["user"] },
    products: productos,
  });
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
        return_url: "https://localhost:5000/payments/capture-order",
        cancel_url: "https://localhost:5000/payments/cancel-order",
      },
    };
    const response = await axios.post(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders`,
      order,
      {
        auth: {
          username:
            "AVwlVSANTKRUrYDVQ0bmVEjUqaC9-RHw8qn3uRVp-xr4SzQae-1GmM4-B-V4y_bP2tCw7gKH2S8SfeKx",
          password:
            "EG_ZGG1BcPvJhGKbU0HafZRgg1mFMRGk0kZVULdRAL-ECDr5IYVzvA1aWNPXiWQHcSRHqxooNZnyoy6Z",
        },
      }
    );
    //                  ACA DEBERIA CAMBIAR EL ESTADO DE LA ORDEN DE CAPTURANDO - PAGADA - ENVIADA
    //deleteStock(products);
    console.log("NEW ORDER", newOrder);
    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/capture-order", async (req, res) => {
  const { token } = req.query;
  console.log(token);
  const response = await axios.post(
    `https://api-m.sandbox.paypal.com/v2/checkout/orders/${token}/capture`,
    {},
    {
      auth: {
        username:
          "AVwlVSANTKRUrYDVQ0bmVEjUqaC9-RHw8qn3uRVp-xr4SzQae-1GmM4-B-V4y_bP2tCw7gKH2S8SfeKx",
        password:
          "EG_ZGG1BcPvJhGKbU0HafZRgg1mFMRGk0kZVULdRAL-ECDr5IYVzvA1aWNPXiWQHcSRHqxooNZnyoy6Z",
      },
    }
  );

  console.log("PURCHASE", response.data.purchase_units[0].shipping);

  res.status(200).send("capture");
});

router.get("/cancel-order", (req, res) => {
  res.redirect("http://localhost:3000/product");
});

export default router;
