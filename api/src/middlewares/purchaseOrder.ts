import Product from "../models/products";
import User from "../models/user";
import PurchaseOrder from "../models/purchaseOrder";

export const purchaseOrder = async (user: Object, products: any, next) => {
  const userFound = await User.findById(user["id"]);

  products.reduce(async (acc: any, obj: Object) => {
    const producto = await Product.findById(obj["productos"]["_id"]);
    userFound.purchases.push(producto);
    console.log(
      "🚀 ~ file: purchaseOrder.ts ~ line 11 ~ products.reduce ~ userFound",
      userFound
    );
    producto.purchases.push(userFound);
    console.log(
      "🚀 ~ file: purchaseOrder.ts ~ line 12 ~ products.reduce ~ producto",
      producto
    );
    const purchaseOrder = new PurchaseOrder({
      user: userFound["_id"],
      products: {
        id: producto["_id"],
      },
    });

    await purchaseOrder.save();
    await producto.save();
    await userFound.save();
  });

  next();
};
