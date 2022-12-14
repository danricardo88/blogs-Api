const Joi = require('joi');

const validateUser = Joi.object(
  {
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email(),
    password: Joi.string().min(6).required(),
    image: Joi.string(),
  },
);

module.exports = validateUser;