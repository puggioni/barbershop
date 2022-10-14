import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { Shift } from "./shift";

export class Services {
  @prop({
    required: true,
    type: String,
  })
  public name: string;

  @prop({
    required: true,
    type: String,
  })
  public description: string;

  @prop({
    required: true,
    type: String,
  })
  public price: string;

  @prop({
    required: true,
    type: String,
  })
  public time: string;

  /* @prop({
    ref: () => Shift,
  })
  public shift: Ref<Shift>; */
}

const ServicesModel = getModelForClass(Services);

export default ServicesModel;
