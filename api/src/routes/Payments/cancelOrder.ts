import { Router } from "express";

const router = Router();
router.get("/cancel-order", (req, res) => {
  res.redirect("htpp://localhost:5000/product");
});
export default router;
