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
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { user, date, block, barber, office } = req.body;
    try {
        const apmt = new appointments_1.default({
            user: user,
            date: date,
            block: block,
            barber: barber,
            office: office
        });
        //obtener los appointments del dia y ver que no este tomado
        const existingApmnt = yield appointments_1.default.findOne({ date: date, block: block });
        console.log(`Existing appointment: ${existingApmnt}`);
        if (existingApmnt === null) {
            apmt.save()
                .then(savedApmt => res.status(200).send(savedApmt));
        }
        else
            res.status(500).json({ info: "appointment already taken!" });
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.default = router;
