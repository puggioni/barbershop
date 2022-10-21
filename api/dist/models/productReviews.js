"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reviewsSchema = new mongoose_1.Schema({
    rating: {
        required: true,
        type: Number,
        min: 0,
        max: 5
    },
    comment: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return ((v.length > 10) && (v.length < 100));
            },
            message: "Comments must be between 10 and 100 chars long!"
        },
    }
}, {
    versionKey: false,
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Reviews", reviewsSchema);
