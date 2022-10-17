import { Router } from "express";
import { verifyToken, isAdmin } from "../Auth/middlewares";
import CategoryModel from "../../models/products";

const router = Router();

router.delete("/delete", verifyToken, isAdmin, async (req, res) => {
  const { id } = req.body;
  try {
    const productDeleted = await CategoryModel.findOneAndDelete({ _id: id });
    res.send(productDeleted);
  } catch (error) {
    res.status(500).send({ error });
  }
});

export default router;
