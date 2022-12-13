const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { User } = require('../services');

const pass = process.env.JWT_SECRET || 'suaSenhaSecreta';
const jwtConf = { expiresIn: '1h', algorithm: 'HS256' };

const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const CONFLICT = 409;
const INTERNAL_ERROR = 500;

const ERRO1 = 'Some required fields are missing';
const ERRO2 = 'Invalid fields';
const ERRO3 = 'User already registered';

const getLogin = async (request, response) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) return response.status(BAD_REQUEST).json({ message: ERRO1 });

    const login = await User.getLogin({ email, password });
    if (!login) return response.status(BAD_REQUEST).json({ message: ERRO2 });

    // const jwtConf = { expiresIn: '1h', algorithm: 'HS256' };
    const token = jwt.sign({ email, password }, pass, jwtConf);
    return response.status(OK).json({ token });
  } catch (error) { 
    console.error(error);
    return response.status(BAD_REQUEST).json({ message: error.message });
  }
};

const userCreateValidation = (body) => Joi.object(
  {
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email(),
    password: Joi.string().min(6).required(),
    image: Joi.string(),
  },
).validate(body);

const userCreate = async (requeste, response) => {
  try {
    const { displayName, email, password, image } = requeste.body;
    const { error } = userCreateValidation({ displayName, email, password });
    if (error) {
      return response.status(BAD_REQUEST).json({ message: error.message });
    }
    const getEmail = await User.getEmail(email); 
    if (getEmail) response.status(CONFLICT).json({ message: ERRO3 });
    
    const create = await User.userCreate({ displayName, email, password, image });
    if (!create) throw Error;

    const loadUser = { displayName, email, password };
    const token = jwt.sign(loadUser, pass, jwtConf);
    return response.status(CREATED).json({ token });
  } catch (error) {
    console.error(error);
    return response.status(INTERNAL_ERROR).json({ message: error.message });
  }
};

module.exports = {
  getLogin,
  userCreate,
};