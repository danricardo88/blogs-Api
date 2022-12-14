const Joi = require('joi');

const validaPostagem = Joi.object(
  {
    title: Joi.string().required().messages({ 'string.empty': 'Some required fields are missing' }),
    content: Joi.string()
    .required().messages({ 'string.empty': 'Some required fields are missing' }),
    categoryIds: Joi.array().min(1).required(),
  },
);

module.exports = validaPostagem;