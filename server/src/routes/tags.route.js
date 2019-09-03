const router = require('express').Router();
const tagsController = require('../controllers/tags.controller');
const tagsSchema = require('../policies/tags.schema');

router.get('/', tagsController.getAll);
router.get('/:id', tagsController.findById);
router.post('/', tagsSchema.register, tagsController.save);
router.delete('/:id', tagsController.remove);
router.put('/:id', tagsController.update);

module.exports = router;
