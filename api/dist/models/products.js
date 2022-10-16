"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const productSchema = new Schema({
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
        type: Number,
        default: 0,
    },
    image: {
        type: String,
        default: "",
    },
    avaible: {
        type: Boolean,
    },
    favorite: {
        type: Boolean,
    },
    categories: [
        {
            type: Schema.Types.ObjectId,
            ref: "Categories",
        },
    ],
}, {
    versionKey: false,
    timestamps: true,
});
exports.default = model("Product", productSchema);
