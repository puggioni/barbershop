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
var mongoose = require('mongoose');
const router = (0, express_1.Router)();
router.post("/addFavorite", auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, userId } = req.body;
    try {
        user_1.default.findById(userId)
            .then(user => {
            user.favorites_products.push(mongoose.Types.ObjectId(productId));
            return user.save();
        })
            .then(savedUser => user_1.default.findById(savedUser._id).populate("favorites_products"))
            .then(completeUser => res.send(completeUser.favorites_products));
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al agregar a favoritos" });
    }
}));
exports.default = router;
