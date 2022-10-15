import { Router } from "express";
import User from "../../models/user";
import jwt from "jsonwebtoken";
const router = Router();

router.post("/signin", async (req, res) => {
  try {
    const userFound = await User.findOne({ email: req.body.email }).populate(
      "role",
      "name -_id"
    );
    if (!userFound) return res.status(400).json({ message: "User not found" });
    const matchPassword = await User.comparePassword(
      req.body.password,
      userFound.password
    );

    if (!matchPassword)
      return res.status(401).json({ token: null, message: "Invalid Password" });

    const token: string = jwt.sign({ _id: userFound._id }, "token", {
      expiresIn: 60 * 60 * 24,
    });
    console.log(userFound);
    res.json({ token });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log(err);
    }
  }
});

export default router;
