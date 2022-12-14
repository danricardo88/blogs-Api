const { User, sequelize } = require('../models');

const getLogin = async ({ email: findEmail, password: findPassword }) => {
  const result = await User.findAll();
  return result.find(({ email, password }) => email === findEmail && password === findPassword);
};

const getEmail = async (findEmail) => {
  const emailUser = await User.findAll({ where: { email: findEmail } });
  return emailUser;
}; 

const getAll = async () => {
  const user = await User.findAll({ attributes: { exclude: ['password'] } });
  return user;
};

const getId = async (id) => {
  const [idGet] = await User.findAll({ where: { id }, attributes: { exclude: ['password'] } });
  return idGet;
};

const userCreate = async (createUser) => {
  try {
    const criando = await sequelize.transaction((async (trans) => {
      const criou = await User.create({ ...createUser }, { transaction: trans });
      return criou;
    }));
    return criando;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// https://sequelize.org/docs/v6/other-topics/transactions/

module.exports = {
  userCreate,
  getLogin,
  getEmail,
  getAll,
  getId,
};
