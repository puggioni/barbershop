import { Router } from "express";

import Office from "../../models/office";
import { verifyToken, isAdmin } from "../../middlewares/auth";

const router = Router();

router.post("/create", async (req, res) => {
    let { lat, long } = req.body;

    try {
        const office = new Office({
            lat: lat,
            long: long
        });

        office.save().then(savedOffice => res.status(200).send(savedOffice))
    }
    catch (error) {
        res.status(500).send(error);
    }
});

export default router;
