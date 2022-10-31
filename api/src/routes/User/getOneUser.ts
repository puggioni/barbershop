import { Router } from "express";

import UsersModels from "../../models/user";

const router = Router();

router.get("/one-user", async (req, res) => {
  const { name } = req.query;

  try {
    const users = await UsersModels.find({
      $or: [
        { name: { $regex: `${name}`, $options: "i" } },
        { email: { $regex: `${name}`, $options: "i" } },
        { lastname: { $regex: `${name}`, $options: "i" } },
      ],
    });

    res.status(200).send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default router;
