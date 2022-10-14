import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { PayMethods } from "./payMethos";
import { Product } from "./products";
import { User } from "./user";

export class PurchaseOrder {
  @prop({
    required: true,
    type: Number,
  })
  public quant_prod: number;

  @prop({
    required: true,
    type: Number,
  })
  public price: number;

  @prop({
    ref: () => User,
  })
  public user: Ref<User>;
  @prop({
    ref: () => Product,
  })
  public product: Ref<Product>;

  @prop({
    ref: () => PayMethods,
  })
  public payMethod: Ref<PayMethods>;
}

const PoModel = getModelForClass(PurchaseOrder);

export default PoModel;
