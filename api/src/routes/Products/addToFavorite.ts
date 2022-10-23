import { Router } from "express";
import User from "../../models/user";
import Product from "../../models/products";
import { verifyToken } from "../../middlewares/auth";
import { Request, Response } from "express";
const router = Router();

router.post(
  "/addFavorite",
  verifyToken,
  async (req: Request, res: Response) => {
    const { product, user } = req.body;
    try {
      const productFound: Object = await Product.findById(product._id);
      const userFound: any = await User.findById(user._id);
      userFound["favorites_products"].push(productFound["_id"]);
      await userFound.save();
      res.status(200).json(userFound);
    } catch (error) {
      res.status(500).json({ message: "Error al agregar a favoritos" });
    }
  }
);

export default router;
