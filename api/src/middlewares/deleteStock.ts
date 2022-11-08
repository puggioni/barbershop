import Product from "../models/products";

export const deleteStock = async (order: Object) => {
  try {
    await order["products"].forEach(async (obj: any) => {
      const producto = await Product.findOne({ name: obj["name"] });
      producto.stock -= obj["quantity"];

      if (producto.stock === 0 || producto.stock < 0) {
        producto.available = false;
      }

      await producto.save();
    });
    return order;
  } catch (error: any) {
    throw new Error(error);
  }
};
