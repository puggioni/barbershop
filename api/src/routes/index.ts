import { Router } from "express";
/* ============PRODUCTS============ */
import postProducts from "./Products/postProducts";
import getProducts from "./Products/getProducts";
import deleteProducts from "./Products/deleteProducts";
import getProduct from "./Products/getProduct";

/* ============CATEGORIES============ */
import postCategories from "./Categories/postCategories";
import deleteCategories from "./Categories/deleteCategories";

const router = Router();

/* ============PRODUCTS============ */
router.use("/products", postProducts);
router.use("/products", getProducts);
router.use("/products", getProduct);
router.use("/products", deleteProducts);

/* ============CATEGORIES============ */
router.use("/categories", postCategories);
router.use("/categories", deleteCategories);
export default router;
