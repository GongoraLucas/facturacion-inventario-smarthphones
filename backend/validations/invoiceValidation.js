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
  items: Joi.array()
    .items(
      Joi.object({
        product: objectId().required(),
        quantity: Joi.number().integer().min(1).required(),
        price: Joi.number().min(0).required(),
      })
    )
    .min(1)
    .required(),
  total: Joi.number().min(0).required(),
});

module.exports = { invoiceSchema };
