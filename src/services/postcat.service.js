const { User, BlogPost, Category } = require('../models');

const create = async (title, content, userId) => {
  const criapostagem = await BlogPost.create({ title, content, userId });
  return criapostagem;
};

const getAll = async () => {
  const tudo = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },

    ],
  });
  return tudo;
};

module.exports = {
  create,
  getAll,
};