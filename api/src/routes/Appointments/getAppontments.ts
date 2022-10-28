import { Router } from "express";
import { isTypeQueryNode } from "typescript";

import Appointment from "../../models/appointments";

const router = Router();

router.get("/all/:id", async (req, res) => {
    let _id = req.params.id;
    try {
        Appointment.find({ user: _id })
            .populate({ path: 'barber', select: 'name' })
            .populate({ path: 'office', select: 'location' })
            .populate({ path: 'user', select: 'email' })
            .then((apmnts) => res.send(apmnts))
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

export default router;
