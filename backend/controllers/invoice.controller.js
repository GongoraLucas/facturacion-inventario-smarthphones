const Invoice = require("../models/Invoice");
const Product = require("../models/Product")

const createInvoice = async (req, res, next) => {
  try {
    const { client, date, items } = req.body;

    if (!client || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ msg: "Cliente e ítems son obligatorios" });
    }

    const productIds = items.map((item) => item.product);
    const dbProducts = await Product.find({ _id: { $in: productIds } });

    if (dbProducts.length !== productIds.length) {
      return res.status(400).json({ msg: "Uno o más productos no existen" });
    }

    // Verificación de stock
    for (const item of items) {
      const product = dbProducts.find((p) => p._id.equals(item.product));
      if (!product) {
        return res.status(400).json({ msg: `Producto con ID ${item.product} no encontrado` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          msg: `Stock insuficiente para el producto "${product.name}". Stock disponible: ${product.stock}, solicitado: ${item.quantity}`
        });
      }
    }

    // Descuento de stock y cálculo total
    let total = 0;
    const validatedItems = [];

    for (const item of items) {
      const product = dbProducts.find((p) => p._id.equals(item.product));
      const subtotal = product.price * item.quantity;
      total += subtotal;

      validatedItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });

      // Descontar stock del producto
      product.stock -= item.quantity;
      await product.save(); // puedes usar bulkWrite si prefieres eficiencia
    }

    // Crear factura
    const invoice = new Invoice({
      client,
      date,
      items: validatedItems,
      total,
    });

    const saved = await invoice.save();
    res.status(201).json(saved);
  } catch (error) {
    next(error);
  }
};
const getInvoices = async (req, res, next) => {
  try {
    const invoices = await Invoice.find()
      .populate("client", "name cedula")
      .populate("items.product", "name price");
    res.json(invoices);
  } catch (error) {
    next(error);
  }
};

const deleteInvoice = async (req, res, next) => {
  try {
    const deleted = await Invoice.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Factura no encontrada" });
    }
    res.json({ message: "Factura eliminada correctamente" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createInvoice,
  getInvoices,
  deleteInvoice,
};
