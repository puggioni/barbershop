"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reviewsSchema = new mongoose_1.Schema({
    rating: {
        required: true,
        type: Number,
    },
    comment: {
        type: String,
        required: true,
    }
}, {
    versionKey: false,
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Reviews", reviewsSchema);
