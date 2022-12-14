const { Category } = require('../models');

const categoriesCreate = async (name) => {
  const create = await Category.create({ name });
  return create;
};

const getAllCategories = async () => {
  const getAll = await Category.findAll();
  return getAll;
};

module.exports = {
  categoriesCreate,
  getAllCategories,
};