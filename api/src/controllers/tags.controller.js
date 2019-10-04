const tagsRepository = require('../repository/tags.repository');

const getAll = async (req, res) => {
  const tags = await tagsRepository.find({});
  return res.status(200).json(tags);
};

const findById = async (req, res) => {
  let tag;
  try {
    tag = await tagsRepository.findById(req.params.id);
  } catch (e) {
    console.error(e.message);
    return res.status(500);
  }
  return res.status(200).json(tag);
};

const save = async (req, res) => {
  try {
    const tag = await tagsRepository.create(req.body);
    console.log(`Created tag: ${tag.name}`);
    return res.status(201).json(tag);
  } catch (e) {
    console.error(e.message);
    return res.status(500);
  }
};

const remove = async (req, res) => {
  let tag;
  try {
    tag = await tagsRepository.remove(req.params.id);
  } catch (e) {
    console.error(e.message);
    return res.status(500);
  }
  if (!tag)
    return res
      .status(404)
      .json({
        success: false,
        message: `Tag not found for id: ${req.params.id}`
      });
  console.log(`Deleted tag: ${tag.name}`);
  return res.status(204).json();
};

const update = async (req, res) => {
  let tag;
  try {
    tag = await tagsRepository.update(req.params.id, req.body);
  } catch (e) {
    console.error(e.message);
    return res.status(500);
  }
  if (!tag)
    return res
      .status(404)
      .json({
        success: false,
        message: `Tag not found for id: ${req.params.id}`
      });
  console.log(`Updated tag: ${tag.name}`);
  return res.status(201).json(tag);
};

module.exports = {
  getAll,
  save,
  remove,
  findById,
  update
};
