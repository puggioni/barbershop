"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
/* ============PRODUCTS============ */
const postProducts_1 = __importDefault(require("./Products/postProducts"));
const getProducts_1 = __importDefault(require("./Products/getProducts"));
const deleteProducts_1 = __importDefault(require("./Products/deleteProducts"));
/* ============CATEGORIES============ */
const postCategories_1 = __importDefault(require("./Categories/postCategories"));
const deleteCategories_1 = __importDefault(require("./Categories/deleteCategories"));
const router = (0, express_1.Router)();
/* ============PRODUCTS============ */
router.use("/products", postProducts_1.default);
router.use("/products", getProducts_1.default);
router.use("/products", deleteProducts_1.default);
/* ============CATEGORIES============ */
router.use("/categories", postCategories_1.default);
router.use("/categories", deleteCategories_1.default);
exports.default = router;
