import { Schema, model } from "mongoose";

export interface IOffice {
  lat: number;
  long: number;
  location: string;
}

const officeSchema = new Schema(
  {
    lat: {
      required: true,
      type: Number,
    },
    long: {
      required: true,
      type: Number,
    },
    location: {
      required: true,
      type: String,
    },
  },

  {
    versionKey: false,
    timestamps: false,
  }
);

export default model<IOffice>("Office", officeSchema);
