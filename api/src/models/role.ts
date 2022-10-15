/* import { prop, getModelForClass } from "@typegoose/typegoose";

export class Role {
  @prop({
    required: true,
    type: String,
  })
  public description: string;
}

const RoleModel = getModelForClass(Role);

export default RoleModel;
 */

import mongoose from "mongoose";

const { Schema, model } = mongoose;

export interface IRole {
  naame: string;
}

const roleSchema = new Schema(
  {
    type: String,
    name: String,
  },
  {
    versionKey: false,
  }
);

export default model<IRole>("Role", roleSchema);
