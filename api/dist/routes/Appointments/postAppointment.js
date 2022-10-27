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
    let { user, date, block, barber, office, service } = req.body;
    let todayDate = new Date();
    let todayDateString = todayDate.toISOString().split('T')[0];
    let todayDateString_year = todayDateString.split('-')[0];
    let todayDateString_month = todayDateString.split('-')[1];
    let todayDateString_day = todayDateString.split('-')[2];
    //check date
    if (todayDateString_year > date.split('-')[0])
        res.status(500).send({ error: `Year cannot be less than ${todayDateString_year}` });
    else if (todayDateString_year === date.split('-')[0] && todayDateString_month > date.split('-')[1])
        res.status(500).send({ error: `Month cannot be less than ${todayDateString_month}` });
    else if (todayDateString_year === date.split('-')[0] && todayDateString_month === date.split('-')[1] && todayDateString_day > date.split('-')[2])
        res.status(500).send({ error: `Day cannot be less than ${todayDateString_day}` });
    //check block
    else if ((block <= 0) || (block >= 9))
        res.status(500).send({ error: "schedule block must be a number between 1 and 8" });
    //check apmnt availability 
    else {
        try {
            const apmt = new appointments_1.default({
                user: user,
                date: date,
                block: block,
                barber: barber,
                office: office,
                service: service
            });
            const existingApmnt = yield appointments_1.default.findOne({ date: date, block: block, barber: barber, office: office });
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
    }
}));
exports.default = router;
