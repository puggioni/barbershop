import { Router } from "express";
/* ============PRODUCTS============ */
import postProducts from "./Products/postProducts";
import getProducts from "./Products/getProducts";
/* ============CATEGORIES============ */
import postCategories from "./Categories/postCategories";
const router = Router();

/* ============PRODUCTS============ */
router.use("/products", postProducts);
router.use("/products", getProducts);

/* ============CATEGORIES============ */
router.use("/categories", postCategories);
export default router;
