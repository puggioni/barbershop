import { Router } from "express";
import { verifyToken, isAdmin } from "../../middlewares/auth";
import Appointment from "../../models/appointments";

const router = Router();

router.delete("/delete/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const deletedApmt = await Appointment.findOneAndDelete({
      _id: _id,
    });
    //liberar bloque en el dia
    res.send(deletedApmt);
  } catch (error) {
    res.status(500).send({ error });
  }
});

export default router;
