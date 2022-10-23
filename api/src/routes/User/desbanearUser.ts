import { Router } from "express";
import { isAdmin } from "../../middlewares/auth";
import User from "../../models/user";

const router = Router();

router.patch("/desbanear/:id", isAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const user: any = await User.findById(id);
    user["banned"] = false;
    user.save();

    res.status(200).send("User updated");
  } catch (error) {
    res.status(500).send({ error });
  }
});

export default router;
