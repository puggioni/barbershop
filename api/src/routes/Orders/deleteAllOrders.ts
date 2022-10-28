import { Router } from "express";
import Orders from "../../models/purchaseOrder";
const router = Router();
/* 
!!======================IMPORTANTE !!!! ======================!!

SOLAMENTE USAR EN POSTMAN PARA BORRAR TODAS LAS ORDENES DE LA BASE DE DATOS
!!======================IMPORTANTE !!!! ======================!! */
router.delete("/delete-all-orders", async (req, res) => {
  try {
    const orders = await Orders.deleteMany({
      state: "Created",
    });
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;
