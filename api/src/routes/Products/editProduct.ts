import { Router } from "express";
import Product from "../../models/products";
import { verifyToken, isAdmin } from "../Auth/middlewares";
const router = Router();

router.patch("/edit/:idProduct", verifyToken, isAdmin, async (req, res) => {
    let { name, description, price, stock, image, categories } = req.body;
    const { idProduct } = req.params;

    if (typeof name === "string") name = name.toLocaleLowerCase();

    const product = await Product.findById(idProduct);
    name ? product.name = name : {};
    description ? product.description = description : {};
    price ? product.price = price : {};
    (stock <= 0) ? product.stock = 0 : product.stock = stock;
    image ? product.image = image : {};
    (stock <= 0) ? product.available = false : product.available = true;
    categories ? product.categories = categories : {};
    
    try {
        const savedProduct = await product.save();
        res.status(200).send(savedProduct);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

export default router;
