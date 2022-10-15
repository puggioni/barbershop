import { prop, getModelForClass, Ref } from "@typegoose/typegoose";

export class Product {
  @prop({
    required: true,
    type: String,
    unique: true,
    trim: true,
  })
  public name: string;

  @prop({
    required: true,
    type: String,
    trim: true,
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
    type: String,
  })
  public imageURL: string;

  @prop({
    type: Boolean,
  })
  public favorite: boolean;

  @prop({
    type: () => [String],
  })
  public categories: String[];
}

const ProductModel = getModelForClass(Product);

export default ProductModel;
