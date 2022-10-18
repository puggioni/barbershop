import { Router } from "express";

import CategoriesModel from "../../models/categories";
import { verifyToken, isAdmin } from "../Auth/middlewares";

const router = Router();

router.post("/create", verifyToken, isAdmin, async (req, res) => {
  let { name } = req.body;
  if (typeof name === "string")
    name = name[0].toUpperCase() + name.substring(1);
  try {
    const response = await CategoriesModel.create({
      name,
    });
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
