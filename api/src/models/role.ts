import { prop, getModelForClass } from "@typegoose/typegoose";

export class Role {
  @prop({
    required: true,
    type: String,
  })
  public description: string;
}

const UserRole = getModelForClass(Role);

export default UserRole;
