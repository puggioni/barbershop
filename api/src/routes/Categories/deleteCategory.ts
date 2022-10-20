import { Router } from "express";
import { verifyToken, isAdmin } from "../../middlewares/auth";
import CategoryModel from "../../models/categories";

const router = Router();

router.delete("/delete", verifyToken, isAdmin, async (req, res) => {
  const { name } = req.body;
  try {
    const deletedCategory = await CategoryModel.findOneAndDelete({
      name: name,
    });
    res.send(deletedCategory);
  } catch (error) {
    res.status(500).send({ error });
  }
});

export default router;
