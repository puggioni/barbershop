// import { prop, getModelForClass, Ref } from "@typegoose/typegoose";

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

import { Schema, model, Types } from "mongoose";

export interface IProduct {
  name: string;
  description: string;
  price: Number;
  stock: Number;
  avaible: Boolean;
  favorite: Boolean;
  categories: {
    [key: string]: any;
  };
}

const productSchema = new Schema(
  {
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
        type: Types.ObjectId,
        ref: "Categories",
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model<IProduct>("Product", productSchema);
