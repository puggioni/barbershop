"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        required: true,
        type: String,
        default: "",
    },
    price: {
        required: true,
        type: Number,
    },
    stock: {
        required: true,
        type: Number,
        default: 0,
    },
    rating: {
        required: true,
        type: Number,
        default: 0,
    },
    rating_sum: {
        required: true,
        type: Number,
        default: 0,
    },
    image: {
        required: true,
        type: String,
        default: "",
    },
    available: {
        type: Boolean,
    },
    favorite: {
        type: Boolean,
    },
    categories: [
        {
            required: true,
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Categories",
        },
    ],
    reviews: [
        {
            required: true,
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Reviews",
        },
    ],
}, {
    versionKey: false,
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Product", productSchema);
