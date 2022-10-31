import mongoose, { Model } from "mongoose";

const { Schema, model } = mongoose;

export interface IPurchaseOrder {
  user: string;
  products: [
    {
      name: string;
      quantity: number;
      price: number;
    }
  ];
  state: string;
  date: Date;
}
const PurchaseOrderSchema = new Schema<IPurchaseOrder>(
  {
    user: {
      type: String,
      ref: "User",
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
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

export default model<IPurchaseOrder>("PurchaseOrder", PurchaseOrderSchema);
