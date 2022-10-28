import Product from "../models/products";

export const deleteStock = async (order: Object) => {
  console.log(order);
  try {
    await order["products"].forEach(async (obj: any) => {
      const producto = await Product.findOne({ name: obj["name"] });
      console.log("PRODUCTO", producto);
      console.log(producto["stock"]);
      producto.stock -= obj["quantity"];
      await producto.save();
    });
    return order;
  } catch (error: any) {
    throw new Error(error);
  }
};
