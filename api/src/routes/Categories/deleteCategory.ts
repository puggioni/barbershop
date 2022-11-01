import { Router } from "express";
import { verifyToken, isAdmin } from "../../middlewares/auth";
import CategoryModel from "../../models/categories";

const router = Router();

router.delete("/delete", verifyToken, isAdmin, async (req, res) => {
  const { id } = req.query;
  try {
    const deletedCategory = await CategoryModel.findOneAndDelete({
      _id: id,
    });
    res.send(deletedCategory);
  } catch (error) {
    res.status(500).send({ error });
  }
});

export default router;
