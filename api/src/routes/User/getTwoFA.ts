import { Router } from "express";

import UsersModels from "../../models/user";

const router = Router();

router.post("/twofa-enabled", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UsersModels.findOne({ email: email });
    user.twofa ? res.status(200).json({ twofa: true, secret: user.secret }) : res.status(200).json({ twofa: false, secret: user.secret });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default router;
