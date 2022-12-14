const jwt = require('jsonwebtoken');
const { User } = require('../services');

const pass = process.env.JWT_SECRET || 'suaSenhaSecreta';
const jwtConf = { expiresIn: '1h', algorithm: 'HS256' };

const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const CONFLICT = 409;
const INTERNAL_ERROR = 500;
const NOT_FOUND = 404;

const ERRO1 = 'Some required fields are missing';
const ERRO2 = 'Invalid fields';
const ERRO3 = 'User already registered';
const ERRO4 = 'User does not exist';

const getLogin = async (request, response) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) return response.status(BAD_REQUEST).json({ message: ERRO1 });

    const login = await User.getLogin({ email, password });
    if (!login) return response.status(BAD_REQUEST).json({ message: ERRO2 });

    const token = jwt.sign({ email, password }, pass, jwtConf);
    return response.status(OK).json({ token });
  } catch (error) { 
    console.error(error);
    return response.status(INTERNAL_ERROR).json({ message: error.message });
  }
};

const userCreate = async (requeste, response) => {
  try {
    const createUser = requeste.body;

    const user = await User.getEmail(createUser.email);
    if (user.length > 0) return response.status(CONFLICT).json({ message: ERRO3 });

    const criou = await User.userCreate(createUser);
    const token = jwt.sign(criou.dataValues, pass, jwtConf);
    return response.status(CREATED).json({ token });
  } catch (error) {
    console.error(error);
    return response.status(INTERNAL_ERROR).json({ message: error.message });
  }
};

const getAll = async (_request, response) => {
  const getAllUser = await User.getAll();
  return response.status(OK).json(getAllUser);
};

const getId = async (request, response) => {
  const { id } = request.params;
  const idGet = await User.getId(id);
  try {
    if (!idGet) response.status(NOT_FOUND).json({ message: ERRO4 });
    return response.status(OK).json(idGet);
  } catch (error) {
    console.error(error);
    return response.status(INTERNAL_ERROR).json({ message: error.message });
  }
};

module.exports = {
  getLogin,
  userCreate,
  getAll,
  getId,
};