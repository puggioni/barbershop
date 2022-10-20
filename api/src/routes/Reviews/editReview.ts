import { Router } from "express";
import Reviews from "../../models/productReviews";
import Product from "../../models/products";
import { verifyToken } from "../Auth/middlewares";
const router = Router();

router.patch("/edit/:IdReview", verifyToken, async (req, res) => {
  let { rating, comment } = req.body;
  const { IdReview } = req.params;
  let oldRating : number;

  try {
    await Reviews.findById(IdReview)
      .then((review) => {
        oldRating = review.rating;
        rating ? (review.rating = rating) : {};
        comment ? (review.comment = comment) : {};
        return review.save();
      })
      .then(savedReview => {
        res.status(200).send(savedReview);
        return Product.findOne({ reviews: IdReview })
      })
      .then(product => {
        product.rating_sum -= oldRating;
        product.rating_sum += rating;
        product.rating = product.rating_sum / product.reviews.length;
        product.save();
      })
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default router;
