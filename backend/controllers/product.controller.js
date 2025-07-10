const Product = require("../models/Product"); 

const createProduct = async (req, res, next) => {
  try {

    const { name, description, price, stock } = req.body;

    const newProduct = await Product.create({
      name,
      description,
      price,
      stock,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const productos = await Product.find();
    res.json(productos);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const eliminated = await Product.findByIdAndDelete(req.params.id);

    if (!eliminated) {
      const error = new Error("Producto no encontrado");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({ message: "Eliminado con éxito" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  getProducts,
};
