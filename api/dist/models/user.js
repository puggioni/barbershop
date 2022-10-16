"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const { Schema, model } = mongoose_1.default;
const UserSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        default: new mongoose_1.Types.ObjectId(),
    },
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
            type: Schema.Types.ObjectId,
            ref: "Role",
        },
    ],
}, {
    versionKey: false,
    timestamps: true,
});
UserSchema.statics.encryptPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcryptjs_1.default.genSalt(10);
    return bcryptjs_1.default.hash(password, salt);
});
UserSchema.statics.comparePassword = (password, receivedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcryptjs_1.default.compare(password, receivedPassword);
});
exports.default = model("User", UserSchema);
