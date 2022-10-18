import { Router } from "express";

import Category from "../../models/categories";
import Product from "../../models/products";
import { verifyToken, isAdmin } from "../Auth/middlewares";
const router = Router();

router.post("/populateProducts", verifyToken, isAdmin, async (req, res) => {

    let productsArray = req.body;

    try {
        for (const product of productsArray) {
            let { name, description, price, stock, image, available, favorite, categories } = product;
            if (typeof name === "string") name = name.toLocaleLowerCase();
            const createdProduct = new Product({
                name: name,
                description: description,
                price: price,
                stock: stock,
                image: image,
                available: available,
                favorite: favorite,
                categories: categories,
            });

            if (categories) {
                const foundCategory = await Category.find({
                    name: { $in: categories },
                });
                createdProduct.categories = foundCategory.map((el) => el._id);
            }
            createdProduct.populate("categories", "name -_id");
            await createdProduct.save();
        }
        res.status(200).send({ info: `products created` });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

export default router;
