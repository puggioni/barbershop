import Product from "../models/products";

export const checkStock = async (req: any, res: any, next) => {
  const { products } = req.body;

  const arr: any = [];
  const productFinded: Object = await Product.findById(products[0]._id);
  const prfind: Object = await Product.find((_id: any) => {
    products[0]._id;
    return products[0]._id;
  });

  console.log(prfind);
  for (let i = 0; i < products.length; i++) {
    const product: Object = await Product.findById(products[i].id);
    if (product["stock"] >= products[i].cantidad) {
      arr.push(product);
    }
  }
  if (arr.length === products.length) {
    next();
  } else {
    res.status(400).send({ message: "No hay stock suficiente" });
  }
};
