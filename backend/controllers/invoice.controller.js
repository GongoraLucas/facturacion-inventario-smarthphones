const Invoice = require("../models/Invoice");

const createInvoice = async (req, res, next) => {
  try {
    const invoice = new Invoice(req.body);
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
