import { Router } from "express";
/* ============PRODUCTS============ */
import postProducts from "./Products/postProducts";
const router = Router();

/* ============PRODUCTS============ */
router.use("/products", postProducts);

export default router;
