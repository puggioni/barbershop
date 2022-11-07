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
const appointments_1 = __importDefault(require("../../models/appointments"));
const router = (0, express_1.Router)();
router.get("/all/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let _id = req.params.id;
    try {
        appointments_1.default.find({ user: _id })
            .populate({ path: "barber", select: "name" })
            .populate({ path: "office", select: "location" })
            .populate({ path: "user", select: "email" })
            .then((apmnts) => res.send(apmnts));
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
exports.default = router;
