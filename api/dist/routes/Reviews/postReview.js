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
const productReviews_1 = __importDefault(require("../../models/productReviews"));
const products_1 = __importDefault(require("../../models/products"));
const middlewares_1 = require("../Auth/middlewares");
const router = (0, express_1.Router)();
router.post("/create", middlewares_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { rating, comment, productId } = req.body;
    //save review, get returned reviewId
    //edit product, add reviewId to reviews[]
    try {
        const review = new productReviews_1.default({
            comment: comment,
            rating: rating,
        });
        const { _id } = yield review.save();
        products_1.default.findById(productId)
            .then((product) => {
            product.reviews.push(_id);
            product.rating_sum += rating;
            product.rating = product.rating_sum / product.reviews.length;
            return product.save();
        })
            .then((savedProduct) => res.status(200).send(savedProduct));
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
exports.default = router;
