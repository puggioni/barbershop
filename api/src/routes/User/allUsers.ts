import { response, Router } from "express";

import UsersModel from "../../models/user";

const router = Router();

router.get("/all", async (req, res) => {
  try {
    await UsersModel.find()
      .populate("purchases")
      .then((users) => res.status(200).send(users));
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default router;
