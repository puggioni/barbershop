import mongoose from "mongoose";

const { Schema, model } = mongoose;

export interface IRole {
  name: string;
}

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export default model<IRole>("Role", roleSchema);
