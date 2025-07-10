const Product = require("../models/Product"); 

const createProduct = async (req, res, next) => {
  try {

    const { name, description, price, stock,category } = req.body;

    const newProduct = await Product.create({
      name,
      description,
      price,
      stock,
      category
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

const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // new: true devuelve el documento actualizado; runValidators para validar los datos
    );
    if (!updatedProduct) {
      const error = new Error("Producto no encontrado");
      error.status = 404;
      return next(error);
    }
    res.json(updatedProduct);
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
  updateProduct
};
