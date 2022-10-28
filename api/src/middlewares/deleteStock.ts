import Product from "../models/products";

export const deleteStock = async (products: any) => {
  console.log(products);
  try {
    products["products"].reduce(async (acc: any, obj: any) => {
      const name = obj["name"];
      const producto = await Product.findOne({ name: name });

      producto["stock"] = producto["stock"] - obj["quantity"];
      producto.save();
    });
  } catch (error: any) {
    throw new Error(error);
  }

  return;
};
