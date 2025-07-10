const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
      minlength: [2, "El nombre debe tener al menos 2 caracteres"],
      maxlength: [100, "El nombre no debe exceder los 100 caracteres"],
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "El precio no puede ser negativo"],
      set: (v) => Math.round(v * 100) / 100, // redondeo a 2 decimales
    },
    stock: {
      type: Number,
      required: true,
      min: [0, "El stock no puede ser negativo"],
    },
    category: {
      type: String,
      enum: ["Xiaomi", "Samsung", "IPhone", "Otro"],
      default: "Otro",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
