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
const ProductReviews_1 = __importDefault(require("../../models/ProductReviews"));
const products_1 = __importDefault(require("../../models/products"));
const auth_1 = require("../../middlewares/auth");
const router = (0, express_1.Router)();
router.delete("/delete", auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _idReview, _idProduct } = req.body;
    try {
        let product = yield products_1.default.findById(_idProduct).populate("reviews");
        const deleteReview = yield ProductReviews_1.default.findOneAndDelete({ _id: _idReview });
        const deleteProductReview = product["reviews"].filter((obj) => obj._id.toString() !== String(_idReview));
        product["reviews"] = deleteProductReview;
        product.rating_sum -= deleteReview.rating;
        product.rating = product.rating_sum / product.reviews.length;
        const saveProduct = yield product.save();
        res.status(200).send(saveProduct);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}));
exports.default = router;
