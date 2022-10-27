"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const PurchaseOrderSchema = new Schema({
    user: {
        type: String,
    },
    products: [
        {
            name: {
                type: String,
                ref: "Product",
            },
            quantity: {
                type: Number,
            },
            price: {
                type: Number,
            },
        },
    ],
    state: {
        type: String,
        default: "Creada",
    },
    date: {
        type: Date,
        default: Date.now(),
    },
}, {
    versionKey: false,
    timestamps: false,
});
exports.default = model("PurchaseOrder", PurchaseOrderSchema);
