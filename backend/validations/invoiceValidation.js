const Joi = require("joi");
const mongoose = require("mongoose");

const objectId = () =>
  Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.error("any.invalid");
    }
    return value;
  }, "ObjectId validation");

const invoiceSchema = Joi.object({
  client: objectId().required(),
   date: Joi.date().iso().optional(),
  items: Joi.array()
    .items(
      Joi.object({
        product: objectId().required(),
        quantity: Joi.number().integer().min(1).required(),
      })
    )
    .min(1)
    .required(),
});

module.exports = { invoiceSchema };
