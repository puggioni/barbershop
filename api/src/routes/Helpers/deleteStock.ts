import Products from "../../models/products";

export const deleteStock = async (order: object) => {
  try {
    const products = await order["products"].reduce(
      async (acc: object, curr: object) => {
        const producto = await Products.findById(acc["_id"]);
        producto["stock"] - acc["quantity"];
        await producto.save();
      }
    );
    return "Stock eliminado";
  } catch (error) {
    return error;
  }
};
