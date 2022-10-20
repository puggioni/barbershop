import { Router } from "express";
import { verifyToken, isAdmin } from "../../middlewares/auth";
import ProductModel from "../../models/products";

const router = Router();

router.delete("/delete", verifyToken, isAdmin, async (req, res) => {
  const { id } = req.body;
  try {
    const deletedProduct = await ProductModel.findOneAndDelete({ _id: id });
    res.send(deletedProduct);
  } catch (error) {
    res.status(500).send({ error });
  }
});

export default router;
