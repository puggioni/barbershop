import Product from "../models/products";

export const deleteStock = async (products: any) => {
  products.reduce(async (acc: any, obj: Object) => {
    const producto = await Product.findById(obj["productos"]["_id"]);
    producto.stock = producto.stock - obj["cantidad"];
    producto.save();
  });

  return;
};
