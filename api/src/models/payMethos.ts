import { prop, getModelForClass } from "@typegoose/typegoose";

export class PayMethods {
  @prop({
    required: true,
    type: String,
  })
  public description: string;
}

const PayMethodsModel = getModelForClass(PayMethods);

export default PayMethodsModel;
