import { Router } from "express";
import User from "../../models/user";
import { isAdmin } from "../../middlewares/auth";

const router = Router();

router.patch("/banear/:id", isAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const user: any = await User.findById(id);
    user["banned"] = true;
    user.save();
    res.status(200).send("User updated");
  } catch (error) {
    res.status(500).send({ error });
  }
});

export default router;
