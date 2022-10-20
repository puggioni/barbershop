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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userFound = yield user_1.default.findOne({
            email: req.body.email,
        }).populate("role", "name -_id");
        if (!userFound)
            return res.status(400).json({ message: "User not found" });
        const matchPassword = yield user_1.default.comparePassword(req.body.password, userFound["password"]);
        if (!matchPassword)
            return res.status(401).json({ token: null, message: "Invalid Password" });
        const token = jsonwebtoken_1.default.sign({ _id: userFound["._id"] }, "token", {
            expiresIn: 60 * 60 * 24,
        });
        const response = {
            user: userFound,
            token,
        };
        console.log(userFound);
        res.header("auth-token", token).send(response);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
exports.default = router;
