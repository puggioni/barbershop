import { Router } from "express";
import { isAdmin, verifyToken } from "../../middlewares/auth";

import UsersModels from "../../models/user";

const router = Router();

router.get("/all", verifyToken, isAdmin, async (req, res) => {
  try {
    await UsersModels.find()
      .populate("purchases")
      .then((users) => res.status(200).send(users));
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default router;
