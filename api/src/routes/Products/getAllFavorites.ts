import { Router } from "express";
import { Request, Response } from "express";
import User from "../../models/user";
import { verifyToken } from "../../middlewares/auth";

const router = Router();

router.get("/favorites", verifyToken, async (req: Request, res: Response) => {
  const { user } = req.body;
  try {
    const userFound: Object = await User.findById(user._id).populate(
      "favorites_products"
    );
    const allProducts = userFound["favorites_products"];
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener favoritos" });
  }
});

export default router;
