import { Router } from "express";
import { Request, Response } from "express";
import User from "../../models/user";
import { verifyToken } from "../../middlewares/auth";
import ProductModel from "../../models/products";

const router = Router();

router.get(
  "/favorites/:id",
  verifyToken,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const userFound :any = await User.findById(id);
      const productsIds = userFound["favorites_products"];
      const allProducts=await ProductModel.find({_id : { $in : productsIds} })
      res.status(200).json(allProducts);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener favoritos" });
    }
  }
);

export default router;
