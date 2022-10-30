import { Router } from "express";
import { isAdmin } from "../../middlewares/auth";
import UserModel from "../../models/user";
import RoleModel from "../../models/role";
const router = Router();

router.patch("/changeToAdmin/:id",isAdmin,async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    const user: any = await UserModel.findById(id);
    const roleFound: Object = await RoleModel.findOne({ name: role });
    user["role"][0] = roleFound["_id"];
    user.save();
    res.status(200).send("User updated");
  } catch (error) {
    res.status(500).send({ error });
  }
});

export default router;
