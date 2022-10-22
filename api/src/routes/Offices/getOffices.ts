import { response, Router } from "express";

import Office from "../../models/office";

const router = Router();

router.get("/all", async (req, res) => {
  try {
    await Office.find()
      .then((offs) => res.status(200).send(offs));
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default router;
