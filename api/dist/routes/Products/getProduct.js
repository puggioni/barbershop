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
const products_1 = __importDefault(require("../../models/products"));
const router = (0, express_1.Router)();
router.get("/:idProduct", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idProduct } = req.params;
    try {
        yield products_1.default.findById(idProduct).populate("reviews")
            .then(response => {
            let filteredProd = {
                "_id": response._id,
                "name": response.name,
                "description": response.description,
                "price": response.price,
                "stock": response.stock,
                "image": response.image,
                "available": response.available,
                "favorite": response.favorite,
                "rating": response.rating,
                "reviews": response.reviews.map(item => { return { reviewId: item._id, rating: item.rating, comment: item.comment }; })
            };
            return filteredProd;
        }).then(prod => res.send(prod));
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
exports.default = router;
