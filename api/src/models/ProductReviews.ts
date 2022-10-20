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
      min: 0,
      max: 5
    },
    comment: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return ((v.length > 10) && (v.length < 100));
        },
        message: "Comments must be between 10 and 100 chars long!"
      },
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model<IReviews>("Reviews", reviewsSchema);
