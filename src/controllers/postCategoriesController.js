const { PostCategory } = require('../services');

const getAll = async (_requeste, response, prox) => {
  try {
    const postagem = await PostCategory.getAll();
    response.status(200).json(postagem);
  } catch (error) {
    prox(error);
  }
};

module.exports = {
  getAll,
};