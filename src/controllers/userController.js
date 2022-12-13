const jwt = require('jsonwebtoken');
const { User } = require('../services');

const pass = process.env.JWT_SECRET || 'suaSenhaSecreta';

const OK = 200;
const BAD_REQUEST = 400;

const ERRO1 = 'Some required fields are missing';
const ERRO2 = 'Invalid fields';

const getLogin = async (request, response) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) return response.status(BAD_REQUEST).json({ message: ERRO1 });

    const login = await User.getLogin({ email, password });
    // if (!login.email || login.password !== password) {
    //   return res.status(400).json({ message: 'Invalid fields' }); 
    // }
    if (!login) return response.status(BAD_REQUEST).json({ message: ERRO2 });

    const jwtConf = { expiresIn: '1h', algorithm: 'HS256' };
    const token = jwt.sign({ email, password }, pass, jwtConf);
    return response.status(OK).json({ token });
  } catch (error) { 
    console.error(error);
    return response.status(BAD_REQUEST).json({ message: error.message });
  }
};

module.exports = {
  getLogin,
};