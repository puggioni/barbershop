import { Router } from "express";
import Reviews from "../../models/productReviews";
import { verifyToken } from "../Auth/middlewares";
const router = Router();

router.patch("/edit/:IdReview", verifyToken, async (req, res) => {
    let { rating, comment } = req.body;
    const { IdReview } = req.params;

    try {
        await Reviews.findById(IdReview)
            .then(review => {
                rating ? review.rating = rating : {};
                comment ? review.comment = comment : {};
                return review.save()
            })
            .then(savedReview => res.status(200).send(savedReview))
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

export default router;
