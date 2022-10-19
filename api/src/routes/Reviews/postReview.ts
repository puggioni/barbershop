import { Router } from "express";
import { ObjectId } from "mongoose";
import Review from "../../models/productReviews";
import Product from "../../models/products";
import { verifyToken, isCommon } from "../Auth/middlewares";
const router = Router();

router.post("/create", verifyToken, async (req, res) => {
  let { rating, comment, productId } =
    req.body;
  //save review, get returned reviewId
  //edit product, add reviewId to reviews[]
  try {
    const review = new Review({
      comment: comment,
      rating: rating
    });
    const { _id } = await review.save();

    Product.findById(productId)
    .then(product => {
      product.reviews.push(_id);
      return product.save();
    })
    .then(savedProduct => res.status(200).send(savedProduct));
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default router;
