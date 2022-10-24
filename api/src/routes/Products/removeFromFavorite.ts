import { Router } from "express";
import User from "../../models/user";
import Product from "../../models/products";
import { verifyToken } from "../../middlewares/auth";
import { Request, Response } from "express";
import ProductModel from "../../models/products";
const router = Router();

router.post(
  "/removeFavorite",
  verifyToken,
  async (req: Request, res: Response) => {
    const { product, user } = req.body;
    try {
      const productFound: Object = await Product.findById(product._id);
      const userFound: any = await User.findById(user._id);
      userFound["favorites_products"].pull(productFound["_id"]);
      await userFound.save();
      const productsIds = userFound["favorites_products"];
      const allProducts=await ProductModel.find({_id : { $in : productsIds} });
      res.status(200).json(allProducts);
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar de favoritos" });
    }
  }
);

export default router;
