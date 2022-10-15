import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import Office from "./office";
class Comment {
  @prop({
    type: String,
  })
  public text: string;

  @prop({
    type: Number,
  })
  public rating: number;
}
class Schelude {
  @prop({
    type: String,
  })
  public day: string;
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

  @prop({
    type: () => [Comment],
  })
  public comments: Comment[];

  @prop({
    ref: () => Office,
  })
  public office: Ref<typeof Office>;
  @prop({
    type: () => [Schelude],
  })
  public schelude: Schelude[];
}

const BarberModel = getModelForClass(Barber);

export default BarberModel;
