import { response, Router } from "express";

import Appointment from "../../models/appointments";

const router = Router();

router.get("/all/:id", async (req, res) => {
    let _id = req.params.id;
    try {
        const apmnts = await Appointment.find({ user: _id });
        res.send(apmnts);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

export default router;
