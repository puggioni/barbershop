import { response, Router } from "express";

import Appointment from "../../models/appointments";

const router = Router();

router.get("/all", async (req, res) => {
    try {
        const apmnts = await Appointment.find().populate({ path: 'barber', select: 'name' }).populate({ path: 'office', select: 'location' });
        res.send(apmnts);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

export default router;
