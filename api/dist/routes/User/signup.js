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
const role_1 = __importDefault(require("./../../models/role"));
const express_1 = require("express");
const user_1 = __importDefault(require("../../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name: name, lastname: lastname, email: email, password: password, phone_number: phone_number, role: role, } = req.body;
    try {
        const userFound = yield user_1.default.findOne({ email: email });
        if (userFound) {
            res.status(400).send("User already exists");
        }
        const user = new user_1.default({
            name: name,
            lastname: lastname,
            email: email,
            password: yield user_1.default.encryptPassword(password),
            phone_number: phone_number,
            role: role,
        });
        if (role) {
            const foundRoles = yield role_1.default.find({
                name: { $in: role },
            });
            user.role = foundRoles.map((role) => role._id);
        }
        else {
            const role = yield role_1.default.findOne({ name: "user" });
            user.role = [role._id];
        }
        const savedUser = yield user.save();
        const token = jsonwebtoken_1.default.sign({ _id: savedUser._id }, "token", {
            expiresIn: 60 * 60 * 24,
        });
        res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
        res.status(200).json({ token, savedUser });
    }
    catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
        }
        else {
            console.log(err);
        }
    }
}));
exports.default = router;
