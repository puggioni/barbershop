import { Router } from "express";
import User from "../../models/user";
import * as dotenv from "dotenv";
dotenv.config();

const router = Router();

router.patch("/pwdRst", async (req, res) => {
  const { idUsr, newPwd } = req.body;
  try {
    const encryptedPwd = await User.encryptPassword(newPwd);
    User.findById(idUsr)
      .then(user => {
        user.password = encryptedPwd;
        return user.save();
      })
      .then(resp => {
        res.redirect(`${process.env.CLIENT_URL}/user/login`);
      })
  }
  catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;