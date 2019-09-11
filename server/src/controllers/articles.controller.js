const articlesRepository = require('../repository/articles.repository');
const formatter = require('../helpers/formatter');

const getAll = async (req, res) => {
  const { data = null, projection = null, options = null} = req.query;
  const articles = await articlesRepository.find(JSON.parse(data), JSON.parse(projection), JSON.parse(options));
  return res.status(200).json(articles.map((article) => formatter(article, 'article')));
};

const findById = async (req, res) => {
  try {
    const article = await articlesRepository.findById(req.params.id);
    return res.status(200).json(formatter(article, 'article'));
  } catch (e) {
    console.error(e);
    return res.status(500);
  }
};

const save = async (req, res) => {
  try {
    article = await articlesRepository.create(req.body);
    console.log(`Created article: ${article.title}, ${article.author} `);
    return res.status(201).json(formatter(article, 'article'));
  } catch (e) {
    console.error(e);
    return res.status(500);
  }
};

const remove = async (req, res) => {
  let article;
  try {
    article = await articlesRepository.remove(req.params.id);
  } catch (e) {
    console.error(e);
    return res.status(500);
  }
  if (!article)
    return res
      .status(404)
      .json({
        success: false,
        message: `Article not found for id: ${req.params.id}`
      });
  console.log(`Deleted article: ${article.title}, ${article.author} `);
  return res.status(204).json();
};

const update = async (req, res) => {
  let article;
  try {
    article = await articlesRepository.update(req.params.id, req.body);
  } catch (e) {
    console.error(e);
    return res.status(500);
  }
  if (!article)
    return res
      .status(404)
      .json({
        success: false,
        message: `Article not found for id: ${req.params.id}`
      });
  console.log(`Updated article: ${article.title}, ${article.author} `);
  return res.status(200).json(formatter(article, 'article'));
};

const uploadImage = async (req, res) => {
  if (req.file) {
    const path = req.file.path.slice(6);
    res.status(200).json({path});
  }
}

const search = async (req, res) => {
  const { data = null, projection = null, options = null} = req.body;
  try {
    const articles = await articlesRepository.find({title: {'$regex': new RegExp(data.title, 'ig')}} , projection, options);
    return res.status(200).json(articles);
  } catch (error) {
    console.log(error)
    return res.status(400);
  }
};

module.exports = {
  getAll,
  save,
  remove,
  findById,
  update,
  uploadImage,
  search,
};
