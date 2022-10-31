import { Schema, model } from "mongoose";

export interface IProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
  rating: number;
  rating_sum: number;
  image: string;
  available: boolean;
  categories: {
    [key: string]: any;
  };
  reviews: {
    [key: string]: any;
  };
  purchases: {
    [key: string]: any;
  };
  favorite: boolean;
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
      type: String,
      default: "",
    },
    available: {
      type: Boolean,
      required: true,
    },
    favorite: {
      type: Boolean,
    },
    categories: [
      {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Categories",
      },
    ],
    reviews: [
      {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Reviews",
      },
    ],
    purchases: [
      {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "PurchaseOrder",
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model<IProduct>("Product", productSchema);
