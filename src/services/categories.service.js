const { Category } = require('../models');

const categoriesCreate = async (name) => {
  const create = await Category.create({ name });
  return create;
};

const getAll = async () => {
  const allControl = await Category.findAll();
  return allControl;
};

module.exports = {
  categoriesCreate,
  getAll,
};