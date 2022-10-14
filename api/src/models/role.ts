import { prop, getModelForClass } from "@typegoose/typegoose";

export class Role {
  @prop({
    required: true,
    type: String,
  })
  public description: string;
}

const RoleModel = getModelForClass(Role);

export default RoleModel;
