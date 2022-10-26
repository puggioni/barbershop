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
const products_1 = __importDefault(require("../../models/products"));
const auth_1 = require("../../middlewares/auth");
const products_2 = __importDefault(require("../../models/products"));
const router = (0, express_1.Router)();
router.post("/removeFavorite", auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product, user } = req.body;
    try {
        const productFound = yield products_1.default.findById(product._id);
        const userFound = yield user_1.default.findById(user._id);
        userFound["favorites_products"].pull(productFound["_id"]);
        yield userFound.save();
        const productsIds = userFound["favorites_products"];
        const allProducts = yield products_2.default.find({ _id: { $in: productsIds } });
        res.status(200).json(allProducts);
    }
    catch (error) {
        res.status(500).json({ message: "Error al eliminar de favoritos" });
    }
}));
exports.default = router;
