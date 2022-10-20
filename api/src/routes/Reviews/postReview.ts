import { Router } from "express";
import Review from "../../models/ProductReviews";
import Product from "../../models/products";
import { verifyToken, isCommon } from "../../middlewares/auth";
const router = Router();

router.post("/create", verifyToken, async (req, res) => {
  let { rating, comment, productId } = req.body;
  //save review, get returned reviewId
  //edit product, add reviewId to reviews[]
  try {
    const review = new Review({
      comment: comment,
      rating: rating,
    });
    const { _id } = await review.save();

    Product.findById(productId)
      .then((product) => {
        product.reviews.push(_id);
        product.rating_sum += rating;
        product.rating = product.rating_sum / product.reviews.length;
        return product.save();
      })
      .then((savedProduct) => res.status(200).send(savedProduct));
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default router;
