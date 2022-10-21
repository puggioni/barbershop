import axios from "axios";
import { Router } from "express";
import { checkStock } from "../../middlewares/checkStock";
import { verifyToken } from "../../middlewares/auth";
const router = Router();

router.post("/create-order", checkStock, verifyToken, async (req, res) => {
  try {
    const order = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: { currency_code: "USD", value: "333" },
          description: "VENTA",
        },
      ],
      application_context: {
        brand_name: "Henry BarberShop",
        landing_page: "LOGIN",
        user_action: "PAY_NOW",
        return_url: "http://localhost:5000/payments/capture-order",
        cancel_url: "http://localhost:5000/payments/cancel-order",
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
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/capture-order", async (req, res) => {
  const { token, PayerID } = req.query;

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

  console.log(response.data);
  res.status(200).send("capture");
});

router.get("/cancel-order", (req, res) => {
  res.redirect("http://localhost:5000/products");
});

export default router;
