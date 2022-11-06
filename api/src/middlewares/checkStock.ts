import Product from "../models/products";

export const checkStock = async (req: any, res: any, next: any) => {
  const { compra } = req.body;

  try {
    let error = 0;

    await compra.reduce(async (acc: any, prod: Object) => {
      const producto = await Product.findOne({ name: prod["name"] });
      if (prod["cantidad"] > producto.stock) {
        error++;
        return producto;
      }
    }, []);
    if (error === 0) {
      next();
    } else {
      throw new Error("No hay stock suficiente");
    }
  } catch (error) {
    res.status(500).json({ message: "No hay stock suficiente" });
  }
};
