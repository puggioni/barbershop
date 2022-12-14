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
const express_1 = require("express");
const dotenv = __importStar(require("dotenv"));
const deleteStock_1 = require("../../middlewares/deleteStock");
const purchaseOrder_1 = __importDefault(require("../../models/purchaseOrder"));
const fetch = (...args) => Promise.resolve().then(() => __importStar(require("node-fetch"))).then(({ default: fetch }) => fetch(...args));
dotenv.config();
const router = (0, express_1.Router)();
router.get("/confirm/:idOrder", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idOrder } = req.params;
    try {
        const order = yield (yield purchaseOrder_1.default.findById(idOrder)).populate("products");
        order["state"] = "Completa";
        (0, deleteStock_1.deleteStock)(order);
        order.save().then(function (savedOrder) {
            return fetch("https://api.sendinblue.com/v3/smtp/email", {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    accept: "application/json",
                    "api-key": `${process.env.SENDINBLUE_API_KEY}`,
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: {
                    sender: {
                        name: "grupo7henry",
                        email: "grupo7henry@gmail.com",
                    },
                    to: [
                        {
                            email: "grupo7henry@gmail.com",
                            name: "Grupo Barbershop",
                        },
                    ],
                    subject: "Orden de compra",
                    htmlContent: `<html>
                              <head></head>
                                <h1>Gracias por su compra!</h1>
                                <body>
                                  <p>Su orden de compra fue confirmada:</p>
                                  ${order.products}
                                  </p>
                                </body>
                            </html>`,
                },
            });
        });
        res.status(200).json(order);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}));
exports.default = router;
