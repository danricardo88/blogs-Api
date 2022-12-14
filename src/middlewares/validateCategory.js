const Joi = require('joi');

const validateCategory = Joi.object({
  name: Joi.string().required(),
});

module.exports = validateCategory;