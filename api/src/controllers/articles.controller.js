const articlesRepository = require('../repository/articles.repository');
const cloudinary = require('cloudinary').v2;


const getAll = async (req, res) => {
  const { data = null, projection = null, options = null} = req.query;
  const {limit = 5, skip = 0, sort = {} } = JSON.parse(options);
  try {
    const articles = await articlesRepository.aggregate(
      [
        { $match: JSON.parse(data) },
        { $lookup: {from: "users", localField: "author.id", foreignField: "_id", as: "author"} },
        { $unwind: "$author" },
        { $project: {"author.password": 0, "author.salt": 0, "author.role": 0, ...JSON.parse(projection)} },
        { $limit : limit },
        { $skip : skip },
        { $sort : sort },
      ]
    );
    return res.status(200).json(articles);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send();
  }
};

const findById = async (req, res) => {
  try {
    const article = await articlesRepository.findById(req.params.id);
    return res.status(200).json(article);
  } catch (e) {
    console.error(e.message);
    return res.status(500).send();
  }
};

const findOne = async (req, res) => {
  try {
    const article = await articlesRepository.findOne({_id: {"$regex": req.params.id} });
    return res.status(200).json(article);
  } catch (e) {
    console.error(e.message);
    return res.status(500).send();
  }
};

const save = async (req, res) => {
  try {
    const article = await articlesRepository.create(req.body);
    console.log(`Created article: ${article.title}, ${article.author} `);
    return res.status(201).json(article); 
  } catch (e) {
    console.error(e.message);
    return res.status(500).send();
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await articlesRepository.remove(id);
    if (!article) {
      return res.status(404).json({
        success: false,
        message: `Article not found for id: ${req.params.id}`
      });
    }
    return res.status(200).send();
  } catch (e) {
    console.error(e.message);
    return res.status(500).send();
  }
};

const update = async (req, res) => {
  let article;
  try {
    article = await articlesRepository.update(req.params.id, req.body);
  } catch (e) {
    console.error(e);
    return res.status(500).send();
  }
  if (!article)
    return res
      .status(404)
      .json({
        success: false,
        message: `Article not found for id: ${req.params.id}`
      });
  console.log(`Updated article: ${article.title}, ${article.author} `);
  return res.status(200).json(article);
};

const uploadImage = (req, res) => {
  if (!req.file) return res.status(500).send();
  cloudinary.uploader.upload_stream({resource_type: 'raw', format: 'jpg'}, async (err, result) => {
    if (result.url) {
      res.status(200).json({path: result.url});
    }
  }).end(req.file.buffer)
}

const search = async (req, res) => {
  const { data = null, projection = null, options = null} = req.body;
  try {
    const articles = await articlesRepository.find({title: {'$regex': new RegExp(data.title, 'ig')}} , projection, options);
    return res.status(200).json(articles);
  } catch (error) {
    console.log(error)
    return res.status(500).send();
  }
};

const weekPosts = async (req, res) => {
  const currentDate = new Date();
  const beggingOfTheWeek = currentDate.setDate(currentDate.getDate() - 7);

  let stages = [
      // Stage 1
      {
        $project: {
            "thumbs": 1, "title": 1, "createdAt": 1, "active": 1
        }
      },
      // Stage 2
      {
        $match: {
          "createdAt": { 
            "$gte": new Date(beggingOfTheWeek),
            "$lte": new Date() 
          },
          "active": true
        }
      },
      // Stage 3
      {
        $addFields: {
          "thumbsCount": {"$size": { "$ifNull": [ "$thumbs", [] ] } }
        }
      },
      // Stage 4
      {
        $sort: {
          "thumbsCount": -1
        }
      },
      // Stage 5
      {
        $limit: 5
      },
    ]

  try {
    const articles = await articlesRepository.aggregate(stages)
    return res.status(200).json(articles)
  } catch (error) {
    console.error(error);
    return res.sendStatus(500)
  }
}

module.exports = {
  getAll,
  save,
  remove,
  findById,
  findOne,
  update,
  uploadImage,
  search,
  weekPosts,
};
