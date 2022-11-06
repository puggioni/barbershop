import { Router } from "express";

import UsersModels from "../../models/user";

const router = Router();

router.get("/twofa-enabled", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UsersModels.findOne({ email: email });
    user.twofa ? res.status(200).json({ twofa: true }) : res.status(200).json({ twofa: false });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default router;
