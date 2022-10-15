"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
/* ============PRODUCTS FILES============ */
const postProducts_1 = __importDefault(require("./Products/postProducts"));
const getProducts_1 = __importDefault(require("./Products/getProducts"));
const deleteProducts_1 = __importDefault(require("./Products/deleteProducts"));
const router = (0, express_1.Router)();
/* ============PRODUCTS============ */
router.use("/products", postProducts_1.default);
router.use("/products", getProducts_1.default);
router.use("/products", deleteProducts_1.default);
/* ============AUTH FILES============ */
const signin_1 = __importDefault(require("./Auth/signin"));
const signup_1 = __importDefault(require("./Auth/signup"));
/* ============AUTH============ */
router.use("/auth", signin_1.default);
router.use("/auth", signup_1.default);
exports.default = router;
