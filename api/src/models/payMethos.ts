import { prop, getModelForClass } from "@typegoose/typegoose";

export class PayMethods {
  @prop({
    required: true,
    type: String,
  })
  public description: string;
}

const payMethods = getModelForClass(PayMethods);

export default payMethods;
