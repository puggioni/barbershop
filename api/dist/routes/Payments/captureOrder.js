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
const axios_1 = __importDefault(require("axios"));
const router = (0, express_1.Router)();
router.get("/capture-order", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, PayerID } = req.query;
    const response = yield axios_1.default.post(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${token}/capture`, {}, {
        auth: {
            username: "AVwlVSANTKRUrYDVQ0bmVEjUqaC9-RHw8qn3uRVp-xr4SzQae-1GmM4-B-V4y_bP2tCw7gKH2S8SfeKx",
            password: "EG_ZGG1BcPvJhGKbU0HafZRgg1mFMRGk0kZVULdRAL-ECDr5IYVzvA1aWNPXiWQHcSRHqxooNZnyoy6Z",
        },
    });
    // await transporter.sendMail({
    //   from: '"Orden completada con éxito!" <grupo7henry@gmail.com', // sender address
    //   to: "seisdedosmanuel2@gmail.com", // list of receivers
    //   subject: "Nodemail test", // Subject line
    //   html: "<b>Orden completa! </b>", // html body
    // });
    const idOrder = response.data.purchase_units[0].reference_id;
    console.log("IDORDER", idOrder);
    console.log(response.data);
    res
        .status(200)
        .redirect(`http://localhost:3000/products/confirmacion/${idOrder}`);
}));
exports.default = router;
