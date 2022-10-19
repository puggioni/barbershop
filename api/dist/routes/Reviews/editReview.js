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
const middlewares_1 = require("../Auth/middlewares");
const router = (0, express_1.Router)();
router.patch("/edit/:IdReview", middlewares_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { rating, comment } = req.body;
    const { IdReview } = req.params;
    try {
        yield productReviews_1.default.findById(IdReview)
            .then(review => {
            rating ? review.rating = rating : {};
            comment ? review.comment = comment : {};
            return review.save();
        })
            .then(savedReview => res.status(200).send(savedReview));
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
exports.default = router;
