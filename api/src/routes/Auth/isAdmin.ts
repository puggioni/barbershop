import { Router } from "express";
import { verifyToken, isAdmin } from "../Auth/middlewares";

const router = Router();

router.get("/isAdmin", verifyToken, isAdmin, async (req, res) => {
  const { name } = req.body;
  try {
    res.status(200).send({ isAdmin: true });
  } catch (error) {
    res.status(500).send({ error });
  }
});

export default router;
