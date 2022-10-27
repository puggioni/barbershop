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
        username:
        `${process.env.PAYPAL_CLIENT_ID}`,
        password:
        `${process.env.PAYPAL_CLIENT_SECRET}`,
      },
    }
  );

  // await transporter.sendMail({
  //   from: '"Orden completada con éxito!" <grupo7henry@gmail.com', // sender address
  //   to: "seisdedosmanuel2@gmail.com", // list of receivers
  //   subject: "Nodemail test", // Subject line

  //   html: "<b>Orden completa! </b>", // html body
  // });

  const idOrder = response.data.purchase_units[0].reference_id;
  console.log("IDORDER", idOrder);

  console.log(response.data);
  res
    .status(200)
    .redirect(`${process.env.PORT_FRONT}products/confirmacion/${idOrder}`);
});

export default router;
