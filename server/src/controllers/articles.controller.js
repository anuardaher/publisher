const articlesRepository = require('../repository/articles.repository');
const formatter = require('../helpers/formatter');

const getAll = async (req, res) => {
  const articles = await articlesRepository.find({});
  return res.status(200).json({ data: articles.map(formatter('article')) });
};

const findById = async (req, res) => {
  let article;
  try {
    article = await articlesRepository.findById(req.params.id);
  } catch (e) {
    console.error(e);
    return res.status(500);
  }
  return res.status(200).json({ data: formatter(article, 'article') });
};

const save = async (req, res) => {
  let article;
  const { title, text, author } = req.body;
  if (!title || !text || !author) {
    return res
      .status(400)
      .json({ success: false, message: 'Missing a required parameter' });
  }
  try {
    article = await articlesRepository.create(req.body);
  } catch (e) {
    console.error(e);
    return res.status(500);
  }
  console.log(`Created article: ${article.title}, ${article.author} `);
  return res.status(201).json(formatter(article, 'article'));
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
  return res.status(201).json(formatter(article, 'article'));
};

module.exports = {
  getAll,
  save,
  remove,
  findById,
  update
};
