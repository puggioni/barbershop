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
const axios_1 = __importDefault(require("axios"));
const express_1 = require("express");
const purchaseOrder_1 = __importDefault(require("../../models/purchaseOrder"));
const router = (0, express_1.Router)();
router.post("/create-order", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, compra } = req.body;
    console.log(req.body);
    /* let value: number = compra.reduce((acc: any, curr: any) => {
      return acc["price"] + curr["price"];
    }); */
    let productos = compra.map((obj) => {
        return {
            name: obj["name"],
            quantity: obj["cantidad"],
            price: obj["price"],
        };
    });
    const newOrder = new purchaseOrder_1.default({
        user: user["email"],
        products: productos,
    });
    console.log(newOrder);
    newOrder.save();
    const idOrder = newOrder["_id"];
    const id = idOrder.toString();
    console.log("🚀 ~ file: createOrder.ts ~ line 28 ~ router.post ~ id", id);
    try {
        const order = {
            intent: "CAPTURE",
            purchase_units: [
                {
                    reference_id: `${idOrder}`,
                    amount: {
                        currency_code: "USD",
                        value: 100,
                    },
                },
            ],
            application_context: {
                brand_name: "Henry BarberShop",
                landing_page: "LOGIN",
                user_action: "PAY_NOW",
                return_url: `http://localhost:5000/payments/capture-order`,
                cancel_url: `http://localhost:5000/payments/cancel-order/${id}`,
            },
        };
        const response = yield axios_1.default.post("https://api-m.sandbox.paypal.com/v2/checkout/orders", order, {
            auth: {
                username: "AVwlVSANTKRUrYDVQ0bmVEjUqaC9-RHw8qn3uRVp-xr4SzQae-1GmM4-B-V4y_bP2tCw7gKH2S8SfeKx",
                password: "EG_ZGG1BcPvJhGKbU0HafZRgg1mFMRGk0kZVULdRAL-ECDr5IYVzvA1aWNPXiWQHcSRHqxooNZnyoy6Z",
            },
        });
        res.status(200).json(response.data);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.default = router;
