import { Schema, model } from "mongoose";

export interface ICategories {
  name: string;
}

const categoriesSchema = new Schema(
  { name: { type: String } },
  {
    versionKey: false,
  }
);

export default model<ICategories>("Categories", categoriesSchema);
