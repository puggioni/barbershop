"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
/* ============PRODUCTS FILES============ */
const postProducts_1 = __importDefault(require("./Products/postProducts"));
const getAllProducts_1 = __importDefault(require("./Products/getAllProducts"));
const getSearchedProducts_1 = __importDefault(require("./Products/getSearchedProducts"));
const deleteProducts_1 = __importDefault(require("./Products/deleteProducts"));
const getProduct_1 = __importDefault(require("./Products/getProduct"));
const filterProducts_1 = __importDefault(require("./Products/filterProducts"));
const editProduct_1 = __importDefault(require("./Products/editProduct"));
const postPopulateProducts_1 = __importDefault(require("./Products/postPopulateProducts"));
/* ============USERS FILES============ */
const signup_1 = __importDefault(require("./User/signup"));
const signin_1 = __importDefault(require("./User/signin"));
const auth_1 = require("../middlewares/auth");
/* ============CATEGORIES============ */
const postCategories_1 = __importDefault(require("./Categories/postCategories"));
const deleteCategory_1 = __importDefault(require("./Categories/deleteCategory"));
const getAllCategories_1 = __importDefault(require("./Categories/getAllCategories"));
/* ============REVIEWS============ */
const postReview_1 = __importDefault(require("./Reviews/postReview"));
const deleteReview_1 = __importDefault(require("./Reviews/deleteReview"));
const editReview_1 = __importDefault(require("./Reviews/editReview"));
const router = (0, express_1.Router)();
/* ============PRODUCTS============ */
router.use("/products", postProducts_1.default);
router.use("/products", getAllProducts_1.default);
router.use("/products", getSearchedProducts_1.default);
router.use("/products", getProduct_1.default);
router.use("/products", deleteProducts_1.default);
router.use("/products", filterProducts_1.default);
router.use("/products", editProduct_1.default);
router.use("/products", postPopulateProducts_1.default);
/* ============USERS============ */
router.use("/users", signup_1.default);
router.use("/users", signin_1.default);
router.use("/users", auth_1.isAdmin);
/* ============CATEGORIES============ */
router.use("/categories", postCategories_1.default);
router.use("/categories", deleteCategory_1.default);
router.use("/categories", getAllCategories_1.default);
/* ============REVIEWS============ */
router.use("/reviews", postReview_1.default);
router.use("/reviews", deleteReview_1.default);
router.use("/reviews", editReview_1.default);
exports.default = router;
