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
const router = (0, express_1.Router)();
router.post("/create-order", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = {
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: { currency_code: "USD", value: "333" },
                    description: "VENTA",
                },
            ],
            application_context: {
                brand_name: "Henry BarberShop",
                landing_page: "LOGIN",
                user_action: "PAY_NOW",
                return_url: `http://localhost:${process.env.PORT}/payments/capture-order`,
                cancel_url: `http://localhost:${process.env.PORT}/payments/cancel-order`,
            },
        };
        const response = yield axios_1.default.post(`https://api-m.sandbox.paypal.com/v2/checkout/orders`, order, {
            auth: {
                username: "AVwlVSANTKRUrYDVQ0bmVEjUqaC9-RHw8qn3uRVp-xr4SzQae-1GmM4-B-V4y_bP2tCw7gKH2S8SfeKx",
                password: "EG_ZGG1BcPvJhGKbU0HafZRgg1mFMRGk0kZVULdRAL-ECDr5IYVzvA1aWNPXiWQHcSRHqxooNZnyoy6Z",
            },
        });
        //                  ACA DEBERIA CAMBIAR EL ESTADO DE LA ORDEN DE CAPTURANDO - PAGADA - ENVIADA
        res.status(200).json(response.data);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
router.get("/capture-order", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, PayerID } = req.query;
    const response = yield axios_1.default.post(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${token}/capture`, {}, {
        auth: {
            username: "AVwlVSANTKRUrYDVQ0bmVEjUqaC9-RHw8qn3uRVp-xr4SzQae-1GmM4-B-V4y_bP2tCw7gKH2S8SfeKx",
            password: "EG_ZGG1BcPvJhGKbU0HafZRgg1mFMRGk0kZVULdRAL-ECDr5IYVzvA1aWNPXiWQHcSRHqxooNZnyoy6Z",
        },
    });
    console.log(response.data);
    res.status(200).send("capture");
}));
router.get("/cancel-order", (req, res) => {
    res.redirect("http://localhost:5000/products");
});
exports.default = router;
