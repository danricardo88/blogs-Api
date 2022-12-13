const { User } = require('../models');

/* const getLogin = async ({ email, password }) => {
  const emailUser = await User.findAll({ where: { email, password } });
  return emailUser;
}; 
 const handleGetLogin = (eamil, findEmail, password, findPassword0) => email === findEmail && password === findPassword; */

// OBS: GETLOGIN <--- Tive que fazer a regra de negocio aqui, pois no arquivo userContoller estava superando o nivel de complexidade suportada pela arrow function. Se der problema ir na mentoria.

const userCreate = async ({ displayName, email, password, image }) => { // mudar nome
  const create = await User.create({ displayName, email, password, image });
  console.log('userCreate');
  return create;
};

const getLogin = async ({ email: findEmail, password: findPassword }) => {
  const emailUser = await User.findAll();
  console.log('getLogin');
  return emailUser.find(({ email, password }) => email === findEmail && password === findPassword);
};

const getEmail = async (email) => {
  const emailUser = await User.findOne({ where: { email } });
  console.log('getEmail');
  return emailUser;
}; 

const getAll = async () => {
  const user = await User.findAll({ attributes: { exclude: ['password'] } });
  console.log('getAll');
  return user;
};

module.exports = {
  userCreate,
  getLogin,
  getEmail,
  getAll,
};
