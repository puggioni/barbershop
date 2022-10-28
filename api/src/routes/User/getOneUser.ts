import { Router } from "express";

import UsersModels from "../../models/user";

const router = Router();

router.get("/one-user", async (req, res) => {
  const { name } = req.query;
  try {
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default router;
