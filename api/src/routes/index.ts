import { Router } from "express";
/* ============PRODUCTS FILES============ */
import postProducts from "./Products/postProducts";
import getProducts from "./Products/getProducts";
import deleteProducts from "./Products/deleteProducts";

const router = Router();

/* ============PRODUCTS============ */
router.use("/products", postProducts);
router.use("/products", getProducts);
router.use("/products", deleteProducts);

/* ============AUTH FILES============ */
import signin from "./Auth/signin";
import signup from "./Auth/signup";
/* ============AUTH============ */
router.use("/auth", signin);
router.use("/auth", signup);
export default router;
