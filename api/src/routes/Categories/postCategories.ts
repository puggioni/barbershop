import { Router } from "express";

import CategoryModel from "../../models/categories";

const router = Router();

router.post("/create", async (req, res) => {
  const { name } = req.body;
  console.log("Received new category:", name);
  try {
    const categorySaved = await CategoryModel.create({name: name});
    res.send(categorySaved);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send({ error });
  }
});

export default router;
