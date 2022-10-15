"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const roleSchema = new Schema({
    type: String,
    name: String,
}, {
    versionKey: false,
});
exports.default = model("Role", roleSchema);
