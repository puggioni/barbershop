import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { User } from "./user";
class Comment {
  @prop({
    type: String,
  })
  public text: string;

  @prop({
    type: Number,
  })
  public rating: number;

  @prop({
    ref: () => User,
  })
  public user: Ref<User>;
}
export class Barber {
  @prop({
    required: true,
    trim: true,
    type: String,
  })
  public name: string;

  @prop({
    required: true,
    type: String,
  })
  public shift: string;

  /*  @prop({
    type: () => [Comment],
  })
  public comments: Comment[]; */
}

const BarberModel = getModelForClass(Barber);

export default BarberModel;
