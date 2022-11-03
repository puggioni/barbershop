import { Router } from "express";
import Orders from "../../models/purchaseOrder";
import * as dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const router = Router();

router.post("/deliver/:idOrder", async (req, res) => {
  const { idOrder } = req.params;
  try {
    const order = await (await Orders.findById(idOrder)).populate("products");
    order["state"] = "Enviada";
    order
      .save()
      .then((savedOrder) => {
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
            subject: "Su orden esta en camino",
            htmlContent: `<html>
              <head></head>
                <h1>Henry Barbershop</h1>
                <body>
                  <p>Estimado usuario,</p>
                  <p>Gracias por su compra!</p>
                  <p>Su orden fue despachada a la direccion especificada. Estamos a su disposición,</p>
                  <p>equipo Henry Barbershop.</p>
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
