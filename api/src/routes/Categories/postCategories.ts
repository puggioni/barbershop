import { Router } from "express";

import CategoryModel from "../../models/categories";

const router = Router();

router.post("/create", async (req, res) => {
  const { name } = req.body;
  try {
    const categorySaved = await CategoryModel.create(req.body);
    res.send(categorySaved);
  } catch (error) {
    res.status(500).send({ error });
  }
});

export default router;
