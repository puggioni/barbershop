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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/cancel-order/:idOrder", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idOrder } = req.params;
    console.log("🚀 ~ file: cancelOrder.ts ~ line 8 ~ router.get ~ idOrder", idOrder);
    try {
        res.redirect(`${process.env.PORT_FRONT}products/cancelacion/${idOrder}`);
    }
    catch (error) {
        console.log(error);
        console.log(error);
        res.status(500).send(error);
    }
}));
exports.default = router;
