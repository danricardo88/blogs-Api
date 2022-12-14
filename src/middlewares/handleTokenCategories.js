const validateCategory = require('./validateCategory');

const ERRO = 400;

module.exports = (request, response, prox) => {
  const { error } = validateCategory.validate(request.body);
  if (error) { 
    return response.status(ERRO).json({ message: error.message }); 
  }
  prox();
};