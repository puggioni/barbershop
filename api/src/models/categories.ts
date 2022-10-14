import { prop, getModelForClass, Ref } from "@typegoose/typegoose";

export class Category {
  @prop({
    required: true,
  })
  public name: string;
}

const CategoryModel = getModelForClass(Category, {
  schemaOptions: { timestamps: true },
});

export default CategoryModel;
