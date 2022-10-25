"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const PurchaseOrderSchema = new Schema({
    user: {
        id: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    products: [
        {
            id: {
                type: Schema.Types.ObjectId,
                ref: "Product",
            },
            quantity: {
                type: Number,
            },
        },
    ],
    state: {
        type: String,
    },
}, {
    versionKey: false,
    timestamps: true,
});
exports.default = model("PurchaseOrder", PurchaseOrderSchema);
