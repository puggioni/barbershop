import { Router } from "express";
import axios from "axios";

const router = Router();

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
