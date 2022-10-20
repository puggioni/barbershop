"use strict";
/* import Role from "./../../models/role";
import { Router } from "express";
import User from "../../models/user";
import jwt from "jsonwebtoken";
const router = Router();

router.post("/signup", async (req, res) => {
  const {
    name: name,
    lastname: lastname,
    email: email,
    password: password,
    phone_number: phone_number,
    role: role,
  } = req.body;

  try {
    const user = new User({
      name: name,
      lastname: lastname,
      email: email,
      password: await User.encryptPassword(password),
      phone_number: phone_number,
      role: role,
    });

    if (role) {
      const foundRoles = await Role.find({
        name: { $in: role },
      });
      user.role = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      user.role = [role._id];
    }

    const savedUser = await user.save();
    const token: string = jwt.sign({ _id: savedUser._id }, "token", {
      expiresIn: 60 * 60 * 24,
    });
    res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
    res.status(200).json({ token, savedUser });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log(err);
    }
  }
});

export default router; */
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
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
router.post("/signup", passport_1.default.authenticate("signup", { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        message: "Signup successful",
        user: req.user,
    });
}));
exports.default = router;
