/* import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { Schema } from "mongoose";
import { Role } from "./role";

export class User {
  @prop({
    required: true,
    type: String,
  })
  public name: string;

  @prop({
    required: true,
    type: String,
  })
  public last_name: string;

  @prop({
    required: true,
    type: String,
  })
  public email: string;

  @prop({
    required: true,
    type: String,
  })
  public password: string;

  @prop({
    required: true,
    type: String,
  })
  public phone_number: string;

  @prop({
    ref: () => Role,
    type: Schema.Types.ObjectId,
  })
  public role: Ref<typeof Role>;

  @prop({
    type: Boolean,
  })
  public confirm: boolean;
}



const UserModel = getModelForClass(User);





export default UserModel;
 */

import mongoose, { Model, Types } from "mongoose";
import bCrypt from "bcryptjs";
const { Schema, model } = mongoose;

export interface IUser {
  email: string;
  password: string;
  name: string;
  lastname: string;
  user_image: string;
  phone_number: string;
  role: {
    [key: string]: any;
  };
  /* adress: {
    postalCode: String;
    country: String;
    direction: String;
    reference: String;
  }; */
}

interface UserModel extends Model<IUser> {
  encryptPassword(password: string): Promise<string>;
  comparePassword(password: string, receivedPassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser, UserModel>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: "",
    },
    lastname: {
      type: String,
      default: "",
    },
    user_image: {
      type: String,
      default: "",
    },
    phone_number: {
      type: String,
      default: "",
    },
    /*  address: {
      type: {
        postalCode: String,
        country: String,
        direction: String,
        reference: String,
      },
      default: {
        postalCode: "",
        country: "",
        direction: "",
        reference: "",
      },
    }, */
    role: [
      {
        type: Types.ObjectId,
        ref: "Role",
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

UserSchema.statics.encryptPassword = async (
  password: string
): Promise<string> => {
  const salt = await bCrypt.genSalt(10);
  return bCrypt.hash(password, salt);
};

UserSchema.statics.comparePassword = async (
  password: string,
  receivedPassword: string
): Promise<boolean> => {
  return await bCrypt.compare(password, receivedPassword);
};

export default model<IUser, UserModel>("User", UserSchema);
