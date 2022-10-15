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
