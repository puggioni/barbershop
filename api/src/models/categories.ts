import { prop, getModelForClass, Ref } from "@typegoose/typegoose";

class Category {
  @prop({
    required: true,
  })
  public name: string;
}

const CategoryModel = getModelForClass(Category);

export default CategoryModel;
