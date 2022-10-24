import mongoose, { Model } from "mongoose";
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
  banned: boolean;
  purchases: {
    [key: string]: any;
  };
  favorites_products: {
    [key: string]: any;
  };
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
    banned: {
      type: Boolean,
      default: false,
    },
    role: [
      {
        type: Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    purchases: [
      {
        type: Schema.Types.ObjectId,
        ref: "PurchaseOrder",
      },
    ],
    favorites_products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
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
