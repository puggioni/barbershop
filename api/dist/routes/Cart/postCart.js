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
const router = (0, express_1.Router)();
router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product } = req.body;
    //busco el producto que me llega por id
    const productFound = yield products_1.default.findOne({ id: product.id });
    //creo un nuevo carrito
    let cart = {
        products: [],
        total: 0,
        quantity: 0,
    };
    try {
        //actualizo las variables del carrito
        cart.products = [...cart.products, productFound];
        cart.total = cart.total + productFound.price;
        cart.quantity = cart.quantity + 1;
        //paso a string el objeto del carrito
        let Storage = JSON.stringify(cart);
        //guardo el carrito en el local storage
        localStorage.setItem("cart", Storage);
        res.status(200).send(cart);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.default = router;
