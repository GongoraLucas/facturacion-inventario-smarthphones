const Joi = require("joi");

const clientSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email({ tlds: { allow: false } }).allow('', null),
  cedula: Joi.string().pattern(/^\d{10}$/).required(),
});

module.exports = {
  clientSchema,
};
