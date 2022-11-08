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
const user_1 = __importDefault(require("../../models/user"));
const auth_1 = require("../../middlewares/auth");
const router = (0, express_1.Router)();
router.put("/edit/:idUsr", auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, name, lastname, phone_number, twofa, secret } = req.body;
    const { idUsr } = req.params;
    try {
        const user = yield user_1.default.findById(idUsr);
        email ? (user.email = email) : {};
        name ? (user.name = name) : {};
        lastname ? (user.lastname = lastname) : {};
        phone_number ? (user.phone_number = phone_number) : {};
        (twofa === true) ? (user.twofa = true) : (user.twofa = false);
        secret ? (user.secret = secret) : {};
        const savedUser = yield user.save();
        res.status(200).send(savedUser);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
exports.default = router;
