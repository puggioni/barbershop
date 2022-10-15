import { prop, getModelForClass, Ref } from "@typegoose/typegoose";

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
}

const ServicesModel = getModelForClass(Services);

export default ServicesModel;
