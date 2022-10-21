import { Router } from "express";

import Appointment from "../../models/appointments";
import { verifyToken } from "../../middlewares/auth";

const router = Router();

router.post("/create", async (req, res) => {
    let { user, date, block, barber, office } = req.body;

    try {
        const apmt = new Appointment({
            user: user,
            date: date,
            block: block,
            barber: barber,
            office: office
        });
        //obtener los appointments del dia y ver que no este tomado
        const existingApmnt = await Appointment.findOne({ date: date, block: block })
        if (existingApmnt === null){
            apmt.save()
            .then( savedApmt => res.status(200).send(savedApmt) )
        }
        else
            res.status(500).json({ info: "appointment already taken!" });
    }
    catch (error) {
    res.status(500).send(error);
}
});

export default router;
