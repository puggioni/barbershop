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
const categories_1 = __importDefault(require("../../models/categories"));
const products_1 = __importDefault(require("../../models/products"));
const middlewares_1 = require("../Auth/middlewares");
const router = (0, express_1.Router)();
router.post("/populateProducts", middlewares_1.verifyToken, middlewares_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let productsArray = req.body;
    try {
        for (const product of productsArray) {
            let { name, description, price, stock, image, available, favorite, categories } = product;
            if (typeof name === "string")
                name = name.toLocaleLowerCase();
            const createdProduct = new products_1.default({
                name: name,
                description: description,
                price: price,
                stock: stock,
                image: image,
                available: available,
                favorite: favorite,
                categories: categories,
            });
            if (categories) {
                const foundCategory = yield categories_1.default.find({
                    name: { $in: categories },
                });
                createdProduct.categories = foundCategory.map((el) => el._id);
            }
            createdProduct.populate("categories", "name -_id");
            yield createdProduct.save();
        }
        res.status(200).send({ info: `products created` });
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
exports.default = router;
