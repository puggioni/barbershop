import { Router } from "express";

import Barber from "../../models/barber";
import { verifyToken, isAdmin } from "../../middlewares/auth";

const router = Router();

router.post("/create", async (req, res) => {
    let { name, office, rating, image } = req.body;

    try {
        const brb = new Barber({
            name: name,
            office: office,
            rating: rating,
            image: image
        });
        brb.save().then(savedBarber => res.status(200).send(savedBarber));
    }
    catch (error) {
        res.status(500).send(error);
    }
});

export default router;
