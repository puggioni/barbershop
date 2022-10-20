"use strict";
/* import { Router } from "express";
import User from "../../models/user";
import jwt from "jsonwebtoken";
const router = Router();

router.post("/login", async (req, res) => {
  try {
    const userFound: Object = await User.findOne({
      email: req.body.email,
    }).populate("role", "name -_id");
    if (!userFound) return res.status(400).json({ message: "User not found" });
    const matchPassword = await User.comparePassword(
      req.body.password,
      userFound["password"]
    );
    if (!matchPassword)
      return res.status(401).json({ token: null, message: "Invalid Password" });

    const token: string = jwt.sign({ _id: userFound["._id"] }, "token", {
      expiresIn: 60 * 60 * 24,
    });
    const response = {
      user: userFound,
      token,
    };
    console.log(userFound);
    res.header("auth-token", token).send(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
 */
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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
router.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate("login", (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (err || !user) {
                const error = new Error("An Error occurred");
                return next(error);
            }
            req.login(user, { session: false }, (error) => __awaiter(void 0, void 0, void 0, function* () {
                if (error)
                    return next(error);
                const body = {
                    _id: user._id,
                    email: user.email,
                    role: user.role[0].name,
                    name: user.name,
                    lastname: user.lastname,
                    phone_number: user.phone_number,
                };
                const token = jsonwebtoken_1.default.sign({ user: body }, "top_secret");
                return res.json({ token });
            }));
        }
        catch (error) {
            return next(error);
        }
    }));
}));
