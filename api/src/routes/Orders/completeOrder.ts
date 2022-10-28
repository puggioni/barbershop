import { Router } from "express";

import Orders from "../../models/purchaseOrder";
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
import * as dotenv from "dotenv";
import { deleteStock } from "../../middlewares/deleteStock";
dotenv.config();

const router = Router();

router.get("/confirm/:idOrder", async (req, res) => {
  const { idOrder } = req.params;
  try {
    const order = await (await Orders.findById(idOrder)).populate("products");
    order["state"] = "Completa";
    deleteStock(order);
    order.save().then(function (savedOrder) {
      return fetch("https://api.sendinblue.com/v3/smtp/email", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          "api-key": `${process.env.SENDINBLUE_API_KEY}`,
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: {
          sender: {
            name: "grupo7henry",
            email: "grupo7henry@gmail.com",
          },
          to: [
            {
              email: "grupo7henry@gmail.com",
              name: "Grupo Barbershop",
            },
          ],
          subject: "Orden de compra",
          htmlContent: `<html>
                              <head></head>
                                <h1>Gracias por su compra!</h1>
                                <body>
                                  <p>Su orden de compra fue confirmada:</p>
                                  ${order.products}
                                  </p>
                                </body>
                            </html>`,
        },
      });
    });

    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;
