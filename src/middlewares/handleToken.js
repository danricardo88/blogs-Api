const jwt = require('jsonwebtoken');
// const { User } = require('../services');

const pass = process.env.JWT_SECRET || 'suaSenhaSecreta';

const UNAUTHORIZED = 401;

const notFaund = 'Token not found';
const expiredOrInvalid = 'Expired or invalid token';

module.exports = async (request, response, prox) => {
  const token = request.header('Authorization');
  if (!token) return response.status(UNAUTHORIZED).json({ message: notFaund });

  try {
    const cod = jwt.verify(token, pass);
    // const user = await User.getAll(cod.userId);
    // request.user = user;
    request.user = cod;

    prox();
  } catch (error) {
    console.error(error);
    return response.status(UNAUTHORIZED).json({ message: expiredOrInvalid });
  }
};