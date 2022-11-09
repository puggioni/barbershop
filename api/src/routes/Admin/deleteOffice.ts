import { Router } from "express";

import Office from "../../models/office";
import { isAdmin } from "../../middlewares/auth";
const router = Router();

router.delete("/delete/:id", isAdmin, async (req, res) => {
  try {
    await Office.findByIdAndDelete(req.params.id);
    res.status(200).send("Deleted");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default router;
