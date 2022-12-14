const { Category } = require('../models');

const categoriesCreate = async (name) => {
  const create = await Category.create({ name });
  return create;
};

const getAll = async () => {
  const allControl = await Category.findAll();
  return allControl;
};

const getId = async (id) => {
  const idget = await Category.findByPk(id);
  return idget;
};

module.exports = {
  categoriesCreate,
  getAll,
  getId,
};