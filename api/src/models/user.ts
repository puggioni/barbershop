import { PurchaseOrder } from "./purchaseOrder";
import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { Role } from "./role";
import { Shift } from "./shift";

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
  })
  public role: Ref<typeof Role>;

  @prop({
    ref: () => Shift,
  })
  public shift: Ref<typeof Shift>;

  @prop({
    ref: () => PurchaseOrder,
  })
  public purchaseOrder: Ref<PurchaseOrder>;

  @prop({
    type: Boolean,
  })
  public confirm: boolean;
}

const user = getModelForClass(User);

export default user;
