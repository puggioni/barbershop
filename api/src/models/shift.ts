import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { Barber } from "./barber";
import { Office } from "./office";
import { Services } from "./services";
/* import { User } from "./user"; */

export class Shift {
  /* @prop({
    ref: () => User,
  })
  public user: Ref<User>; */

  @prop({
    ref: () => Barber,
  })
  public barber: Ref<Barber>;

  @prop({
    ref: () => Office,
  })
  public office: Ref<Office>;

  @prop({
    ref: () => Services,
  })
  public services: Ref<Services>;
}

const ShiftModel = getModelForClass(Shift);

export default ShiftModel;
