import { Router } from "express";
import Orders from "../../models/purchaseOrder";

const router = Router();

router.get("/cancel/:idOrder", async (req, res) => {
  const { idOrder } = req.params;
  try {
    const order = await Orders.findById(idOrder);
    order["state"] = "Cancelada";
    await order.save();

    // await transporter.sendMail({
    //   from: '"Orden completada con éxito!" <grupo7henry@gmail.com', // sender address
    //   to: "seisdedosmanuel2@gmail.com", // list of receivers
    //   subject: "Hello ✔", // Subject line

    //   html: "<b>Orden completa! </b>", // html body
    // });

    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;
