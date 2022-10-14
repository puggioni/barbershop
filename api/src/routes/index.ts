import { Router } from "express";
/* ============PRODUCTS============ */
import postProducts from "./Products/postProducts";
import getProducts from "./Products/getProducts";
const router = Router();

/* ============PRODUCTS============ */
router.use("/products", postProducts);
router.use("/products", getProducts);

export default router;
