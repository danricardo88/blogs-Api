const { User } = require('../models');

const userCreate = async ({ displayName, email, password, image }) => { // mudar nome
  const create = await User.create({ displayName, email, password, image });
  return create;
};

// const getLogin = async ({ email, password }) => {
//   const emailUser = await User.findAll({ where: { email, password } });
//   return emailUser;
// };

// OBS: GETLOGIN <--- Tive que fazer a regra de negocio aqui, pois no arquivo userContoller estava superando o nivel de complexidade suportada pela arrow function. Se der problema ir na mentoria. 

const getLogin = async ({ email: findEmail, password: findPassword }) => {
  const emailUser = await User.findAll();
  return emailUser.find(({ email, password }) => email === findEmail && password === findPassword);
};

module.exports = {
  userCreate,
  getLogin,
};
