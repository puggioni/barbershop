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
exports.checkStock = void 0;
const products_1 = __importDefault(require("../models/products"));
const checkStock = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { products } = req.body;
    const arr = [];
    for (let i = 0; i < products.length; i++) {
        const product = yield products_1.default.findById(products[i].id);
        if (product.stock >= products[i].cantidad) {
            arr.push(product);
        }
    }
    if (arr.length === products.length) {
        next();
    }
    else {
        res.status(400).send({ message: "No hay stock suficiente" });
    }
});
exports.checkStock = checkStock;
