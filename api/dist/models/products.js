"use strict";
// import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
Object.defineProperty(exports, "__esModule", { value: true });
// export class Product {
//   @prop({
//     required: true,
//     type: String,
//     unique: true,
//     trim: true,
//   })
//   public name: string;
//   @prop({
//     required: true,
//     type: String,
//     trim: true,
//   })
//   public description: string;
//   @prop({
//     required: true,
//     type: Number,
//   })
//   public price: number;
//   @prop({
//     default: 0,
//     type: Number,
//   })
//   public stock: number;
//   @prop({
//     type: Boolean,
//   })
//   public available: boolean;
//   @prop({
//     type: Boolean,
//   })
//   public favorite: boolean;
//   @prop({
//     type: () => [String],
//   })
//   public categories: String[];
// }
// const ProductModel = getModelForClass(Product);
// export default ProductModel;
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
        type: Number,
        default: 0,
    },
    avaible: {
        type: Boolean,
    },
    favorite: {
        type: Boolean,
    },
    categories: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "Categories",
        },
    ],
}, {
    versionKey: false,
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Product", productSchema);
