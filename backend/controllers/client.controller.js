const Client = require("../models/Client");

const createClient = async (req, res, next) => {
  try {
    const newClient = await Client.create(req.body);
    res.status(201).json(newClient);
  } catch (error) {
    next(error);
  }
};

const getClients = async (req, res, next) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    next(error);
  }
};

const deleteClient = async (req, res, next) => {
  try {
    const deleted = await Client.findByIdAndDelete(req.params.id);
    if (!deleted) {
      const error = new Error("Cliente no encontrado");
      error.status = 404;
      return next(error);
    }
    res.json({ message: "Cliente eliminado correctamente" });
  } catch (error) {
    next(error);
  }
};

const updateClient = async (req, res, next) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // new: true devuelve el documento actualizado; runValidators para validar los datos
    );
    if (!updatedClient) {
      const error = new Error("Cliente no encontrado");
      error.status = 404;
      return next(error);
    }
    res.json(updatedClient);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createClient,
  getClients,
  deleteClient,
  updateClient
};
