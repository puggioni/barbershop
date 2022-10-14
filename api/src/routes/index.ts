import { Router } from "express";
/* ============PRODUCTS============ */
import postProducts from "./Products/postProducts";
import getProducts from "./Products/getProducts";
import deleteProducts from "./Products/deleteProducts";

const router = Router();

/* ============PRODUCTS============ */
router.use("/products", postProducts);
router.use("/products", getProducts);
router.use("/products", deleteProducts);

export default router;
