import { Router } from "express";

import Office from "../../models/office";
import { verifyToken, isAdmin } from "../../middlewares/auth";
const router = Router();

router.patch("/edit/:id", [verifyToken, isAdmin], async (req, res) => {
  const office = await Office.findById(req.params.id);

  try {
    const { lat, long, location } = req.body;
    if (lat) office.lat = lat;
    if (long) office.long = long;
    if (location) office.location = location;
    const savedOffice = await office.save();
    res.status(200).send(savedOffice);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;
