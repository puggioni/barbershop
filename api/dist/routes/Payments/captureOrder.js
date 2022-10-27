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
const axios_1 = __importDefault(require("axios"));
const router = (0, express_1.Router)();
const dotenv = __importStar(require("dotenv"));
dotenv.config();
router.get("/capture-order", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, PayerID } = req.query;
    const response = yield axios_1.default.post(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${token}/capture`, {}, {
        auth: {
            username: `${process.env.PAYPAL_CLIENT_ID}`,
            password: `${process.env.PAYPAL_CLIENT_SECRET}`,
        },
    });
    // await transporter.sendMail({
    //   from: '"Orden completada con éxito!" <grupo7henry@gmail.com', // sender address
    //   to: "seisdedosmanuel2@gmail.com", // list of receivers
    //   subject: "Nodemail test", // Subject line
    //   html: "<b>Orden completa! </b>", // html body
    // });
    const idOrder = response.data.purchase_units[0].reference_id;
    res
        .status(200)
        .redirect(`${process.env.PORT_FRONT}products/confirmacion/${idOrder}`);
}));
exports.default = router;
