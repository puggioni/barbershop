import { Router } from "express";
import Orders from "../../models/purchaseOrder";
import * as dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const router = Router();

router.get("/confirm/:idOrder", async (req, res) => {
  const { idOrder } = req.params;
  try {
    const order = await (await Orders.findById(idOrder)).populate("products");
    order["state"] = "Completa";
    order
      .save()
      .then((savedOrder) => {
        let total = 0;
        const options = {
          method: "post",
          url: "https://api.sendinblue.com/v3/smtp/email",
          data: {
            sender: {
              name: "grupo7henry",
              email: "grupo7henry@gmail.com",
            },
            to: [
              {
                email: `${savedOrder.user}`,
                name: `${savedOrder.user}`,
              },
            ],
            subject: "Orden de compra",
            htmlContent: `<html>
              <head></head>
                <h1>Henry Barbershop</h1>
                <body>
                  <p>Confirmacion de orden de compra: </p>
                  <p>
                    <ul>
                      ${savedOrder.products
                        .map((item) => {
                          total += item.price;
                          return `<li>${item.quantity} x ${item.name} : $ ${item.price}</li>`;
                        })
                        .join("")}
                    </ul>
                    <p>_____________________________________</p>
                    <p>Total: $ ${total}</p>
                  </p>
                </body>
            </html>`,
          },
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            "api-key": `${process.env.SENDINBLUE_API_KEY}`,
          },
        };
        return axios(options);
      })
      .then((mailServerRes) => {
        res.status(200).json(order);
      });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;
