"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_1 = __importDefault(require("../../models/products"));
const cloudinary_1 = require("../../libs/cloudinary");
const auth_1 = require("../../middlewares/auth");
const router = (0, express_1.Router)();
router.put("/edit/:idProduct", auth_1.verifyToken, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, description, price, stock, categories } = req.body;
    const { idProduct } = req.params;
    console.log("si estoy");
    try {
        if (typeof name === "string")
            name = name.toLocaleLowerCase();
        const imagen = yield (0, cloudinary_1.uploadImage)(req.files.image.tempFilePath);
        imagen ? console.log(imagen["secure_url"]) : console.log("no se cargo");
        const product = yield products_1.default.findById(idProduct);
        // name ? (product.name = name) : {};
        // description ? (product.description = description) : {};
        // price ? (product.price = price) : {};
        // stock <= 0 ? (product.stock = 0) : (product.stock = stock);
        // imagen ? (product.image = imagen["secure_url"]) : {};
        // stock <= 0 ? (product.available = false) : (product.available = true);
        //categories ? (product.categories = categories) : {};
        console.log(product);
        console.log(product);
        const savedProduct = yield product.save();
        res.status(200).send("si responde");
    }
    catch (err) {
        console.log(err);
        res.status(500).send("es este error");
    }
}));
exports.default = router;
