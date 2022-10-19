import { response, Router } from "express";

import CategoryModel from "../../models/categories";

const router = Router();

router.get("/all", async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.send(categories);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default router;
