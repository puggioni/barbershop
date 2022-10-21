import { response, Router } from "express";

import Barber from "../../models/barber";

const router = Router();

router.get("/all", async (req, res) => {
  try {
    await Barber.find()
      .then((brb) => res.status(200).send(brb));
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default router;
