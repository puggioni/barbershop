import { Router } from "express";
/* ============PRODUCTS============ */
import postProducts from "./Products/postProducts";
import getProducts from "./Products/getProducts";
/* ============CATEGORIES============ */
import postCategories from "./Categories/postCategories";
import deleteCategories from "./Categories/deleteCategories";

const router = Router();

/* ============PRODUCTS============ */
router.use("/products", postProducts);
router.use("/products", getProducts);

/* ============CATEGORIES============ */
router.use("/categories", postCategories);
router.use("/categories", deleteCategories);
export default router;
