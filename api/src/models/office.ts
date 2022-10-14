import { prop, getModelForClass } from "@typegoose/typegoose";

export class Office {
  @prop({
    required: true,
    type: String,
  })
  public location: String;

  @prop({
    required: true,
    type: String,
  })
  public shift: String;
}

const OfficeModel = getModelForClass(Office);

export default OfficeModel;
