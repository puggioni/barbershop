import { Schema, model, Types } from "mongoose";

export interface IBarber {
  name: number;
  office: Types.ObjectId;
  rating: number;
}

const barberSchema = new Schema(
  {
    name: { required: true, type: String },
    office: { type: Types.ObjectId, ref: 'Office' },
    rating: { required: true, type: Number, default: 0 }
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

export default model<IBarber>("Barber", barberSchema);
