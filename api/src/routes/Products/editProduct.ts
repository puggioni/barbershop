import { Router } from "express";
import Product from "../../models/products";
import { uploadImage } from "../../libs/cloudinary";
import { verifyToken, isAdmin } from "../../middlewares/auth";
import Category from "../../models/categories";
const router = Router();

router.put("/edit/:idProduct", verifyToken, isAdmin, async (req:any, res) => {
  let { name, description, price, stock, categories } = req.body;
  const { idProduct } = req.params;
  //console.log("si estoy " + image + price);
  try {
  if (typeof name === "string") name = name.toLocaleLowerCase();
  let imagen: any={};
 if(req.files?.image) imagen = await uploadImage(req.files.image.tempFilePath);
  const product = await Product.findById(idProduct);
  name ? (product.name = name) : {};
  description ? (product.description = description) : {};
  price ? (product.price = price) : {};
  stock <= 0 ? (product.stock = 0) : (product.stock = stock);
  imagen.secure_url ? (product.image = imagen["secure_url"]) : {};
  stock <= 0 ? (product.available = false) : (product.available = true);

  if (categories) {
    categories=JSON.parse(categories)
    console.log(categories)
    const foundCategory = await Category.find({
      name: { $in: categories },
    });
    product.categories = foundCategory.map((el) => el._id);
  }
    product.populate("categories", "name -_id");
    const savedProduct = await product.save();
    
    console.log(savedProduct)
    res.status(200).send(savedProduct);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default router;
