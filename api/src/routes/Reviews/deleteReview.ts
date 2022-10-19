import { Router } from "express";
import { ObjectId } from "mongoose";
import Review from "../../models/productReviews";
import Product from "../../models/products";
import { verifyToken, isCommon } from "../Auth/middlewares";
const router = Router();

router.delete("/delete", verifyToken, async (req, res) => {
  const { _idReview, _idProduct } = req.body;
  try {
    let product = await Product.findById(_idProduct).populate("reviews");
    const deleteReview = await Review.findOneAndDelete({ _id: _idReview });
    const deleteProductReview = product["reviews"].filter(
      (obj: any) => obj._id.toString() !== String(_idReview)
    );
    product["reviews"] = deleteProductReview;

    const saveProduct = await product.save();

    res.status(200).send(product);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;
