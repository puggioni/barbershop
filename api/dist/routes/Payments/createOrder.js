"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const axios_1 = __importDefault(require("axios"));
const express_1 = require("express");
const purchaseOrder_1 = __importDefault(require("../../models/purchaseOrder"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const router = (0, express_1.Router)();
router.post("/create-order", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, compra } = req.body;
    let value = compra.reduce((acc, curr) => {
        return acc["price"] + curr["price"];
    });
    console.log(value);
    let productos = compra.map((obj) => {
        return { id: obj["id"], quantity: obj["cantidad"] };
    });
    const newOrder = new purchaseOrder_1.default({
        user: { id: user["user"] },
        products: productos,
    });
    console.log(newOrder);
    newOrder.save();
    const idOrder = newOrder["_id"];
    try {
        const order = {
            intent: "CAPTURE",
            purchase_units: [
                {
                    reference_id: `${idOrder}`,
                    amount: {
                        currency_code: "USD",
                        value: value,
                    },
                },
            ],
            application_context: {
                brand_name: "Henry BarberShop",
                landing_page: "LOGIN",
                user_action: "PAY_NOW",
                return_url: `${process.env.CLIENT_URL}/payments/capture-order`,
                cancel_url: `${process.env.CLIENT_URL}/payments/cancel-order`,
            },
        };
        const response = yield axios_1.default.post("https://api-m.sandbox.paypal.com/v2/checkout/orders", order, {
            auth: {
                username: `${process.env.PAYPAL_CLIENT_ID}`,
                password: `${process.env.PAYPAL_CLIENT_SECRET}`,
            },
        });
        //deleteStock(products);
        res.status(200).json(response.data);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.default = router;
