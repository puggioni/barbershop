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
const purchaseOrder_1 = __importDefault(require("../../models/purchaseOrder"));
const products_1 = __importDefault(require("../../models/products"));
const router = (0, express_1.Router)();
router.get("/product-orders/:idProduct", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idProduct } = req.params;
    const product = yield products_1.default.findById(idProduct);
    console.log(product);
    try {
        const orders = yield purchaseOrder_1.default.find({});
        let productOrders = [];
        const products = orders.forEach((obj) => {
            obj["products"].forEach((prod) => {
                if (prod["name"] === product.name) {
                    productOrders.push(obj);
                }
            });
        });
        res.status(200).send(productOrders);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.default = router;
