const { Category } = require('../services');

const CREATED = 201;
const BAD_REQUEST = 400;
const OK = 200;

const ERRO1 = '"name" is required';

const categoriesCreate = async (request, response) => {
  try {
    const { name } = request.body;
    if (!name) response.status(BAD_REQUEST).json({ message: ERRO1 }); 

    const create = await Category.categoriesCreate(name);
    return response.status(CREATED).json(create);
  } catch (error) {
    console.error(error);
    response.status(BAD_REQUEST).json({ message: error.message });
  }
};

const getAll = async (request, response) => {
  const allGet = await Category.getAll();
  return response.status(OK).json(allGet);
};

module.exports = {
  categoriesCreate,
  getAll,
};
// Gratidão a todos os envolvidos no Back1 ! equipe foda de mais 