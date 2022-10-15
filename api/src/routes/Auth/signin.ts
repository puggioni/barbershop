import { Router } from "express";
import User from "../../models/user";
const router = Router();

router.post("/signin", async (req, res) => {
  try {
    res.json("signin");
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log(err);
    }
  }
});

export default router;
