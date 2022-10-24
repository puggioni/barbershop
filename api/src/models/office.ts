import { Schema, model } from "mongoose";

export interface IOffice {
    lat: number;
    long: number;
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
    },
    {
        versionKey: false,
        timestamps: false,
    }
);

export default model<IOffice>("Office", officeSchema);
