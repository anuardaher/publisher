const tagsRepository = require('../repository/tags.repository');
const formatter = require('../helpers/formatter')

const getAll = async(req, res) => {
    const tags = await tagsRepository.find({})
    return res.status(200).json({ data: tags.map(formatter("tag")) })
}

const findById = async(req, res) => {
    let tag;
    try {
        tag = await tagsRepository.findById(req.params.id)
    } catch (e) {
        console.error(e);
        return res.status(500)
    }
    return res.status(200).json({ data: formatter(tag, "tag") });
}

const save = async(req, res) => {
    let tag;
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ success: false, message: "Missing a required parameter" })
    }
    try {
        tag = await tagsRepository.create(req.body)
    } catch (e) {
        console.error(e);
        return res.status(500)
    }
    console.log(`Created tag: ${tag.name}`);
    return res.status(201).json(formatter(tag, "tag"));
}

const remove = async(req, res) => {
    let tag;
    try {
        tag = await tagsRepository.remove(req.params.id);
    } catch (e) {
        console.error(e);
        return res.status(500);
    }
    if (!tag) return res.status(404).json({ success: false, message: `Tag not found for id: ${req.params.id}` })
    console.log(`Deleted tag: ${tag.name}`);
    return res.status(204).json();
}

const update = async(req, res) => {
    let tag;
    try {
        tag = await tagsRepository.update(req.params.id, req.body);
    } catch (e) {
        console.error(e);
        return res.status(500);
    }
    if (!tag) return res.status(404).json({ success: false, message: `Tag not found for id: ${req.params.id}` })
    console.log(`Updated tag: ${tag.name}`);
    return res.status(201).json(formatter(tag, "tag"));
}

module.exports = {
    getAll,
    save,
    remove,
    findById,
    update
}