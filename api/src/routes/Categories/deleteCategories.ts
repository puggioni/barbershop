import { Router } from "express";

import CategoryModel from "../../models/categories";

const router = Router();

router.delete("/delete", async (req, res) => {
  const { name } = req.body;
  try {
    const categoryDeleted = await CategoryModel.findOneAndDelete({name : name});
    res.send(categoryDeleted);
  } catch (error) {
    res.status(500).send({error});
  }
});

export default router;
