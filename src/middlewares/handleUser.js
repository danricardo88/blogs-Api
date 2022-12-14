const validadeUser = require('./validation/validateUser');

const ERRO = 400;

module.exports = (request, response, prox) => {
  const { error } = validadeUser.validate(request.body);
  if (error) {
    return response.status(ERRO).json({ message: error.message });
  }
  prox();
};