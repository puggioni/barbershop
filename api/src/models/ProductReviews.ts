import { Schema, model } from "mongoose";

export interface IReviews {
  rating: number;
  comment: string;
}

const reviewsSchema = new Schema(
  {
    rating: {
      required: true,
      type: Number,
    },
    comment: {
      type: String,
      required: true,
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model<IReviews>("Reviews", reviewsSchema);
