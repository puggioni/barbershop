import {
  prop,
  getModelForClass,
  Ref,
  modelOptions,
} from "@typegoose/typegoose";

export class Category {
  @prop({
    required: true,
    unique: true,
    trim: true,
  })
  public name: string;
}

const CategoryModel = getModelForClass(Category, {
  schemaOptions: { timestamps: true },
});

export default CategoryModel;
