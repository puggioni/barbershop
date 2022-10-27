import { Router } from "express";
import Users from "../../models/user";
import Orders from "../../models/purchaseOrder";

const router = Router();

router.get("/personal-orders/:idUser", async (req, res) => {
  const { idUser } = req.params;

  try {
    const user = await Users.find({ _id: idUser });
    const email = user[0]["email"];
    const orders = await Orders.find({ user: email });

    res.send(orders);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default router;
