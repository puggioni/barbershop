import { Router } from "express";
import User from "../../models/user";
import Product from "../../models/products";
import { verifyToken } from "../../middlewares/auth";
import { Request, Response } from "express";
import ProductModel from "../../models/products";
const router = Router();

router.post(
  "/addFavoriteBulk",
  verifyToken,
  async (req: Request, res: Response) => {
    const { products, user } = req.body;
    
    try {
      const productsFounds: Array<object> = await Product.find({_id : { $in : products._id} });
      let userFound: any = await User.findById(user._id);
      const productsToAdd=productsFounds.map((p:any)=>(p._id));
      userFound["favorites_products"]=userFound["favorites_products"].concat(productsToAdd) ;  
      await userFound.save();
      const productsIds = userFound["favorites_products"];
      const allProducts=await ProductModel.find({_id : { $in : productsIds} });
      res.status(200).json(allProducts);
    } catch (error) {
      res.status(500).json({ message: "Error al agregar a favoritos" });
    }
  }
);
export default router;