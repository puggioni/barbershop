import { Router } from "express";

import UsersModels from "../../models/user";

const router = Router();

router.get("/one-user", async (req, res) => {
  const { name } = req.query;
  try {
    const nombre = UsersModels.find({ name: name });
    const user = UsersModels.find({ lastname: name });
    const mail = UsersModels.find({ email: name });
    const promesas = await Promise.all([nombre, user, mail]);
    const users = promesas.filter((obj: any) => {
      return obj.length !== 0;
    });
    res.status(200).send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default router;
