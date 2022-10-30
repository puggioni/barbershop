import { Router } from "express";
import mongoose from "mongoose";

import Orders from "../../models/purchaseOrder";

const router = Router();

router.get("/search-order", async (req, res) => {
  const { name } = req.query;

  try {
    if (mongoose.isValidObjectId(name)) {
      const orders = await Orders.findById(name);
      res.status(200).send(orders);
    } else {
      const orders = await Orders.find({
        user: { $regex: `${name}`, $options: "i" },
      });
      res.status(200).send(orders);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default router;
