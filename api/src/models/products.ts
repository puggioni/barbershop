import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import CategoryModel from "./categories";

export class Product {
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
    type: Number,
  })
  public price: number;

  @prop({
    default: 0,
    type: Number,
  })
  public stock: number;

  @prop({
    type: Boolean,
  })
  public available: boolean;

  @prop({
    type: Boolean,
  })
  public favorite: boolean;

  @prop({
    ref: () => CategoryModel,
  })
  public category: Ref<typeof CategoryModel>[];
}

const ProductModel = getModelForClass(Product);

export default ProductModel;
