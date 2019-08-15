const router = require('express').Router();
const tagsController = require('../controllers/tags.controller');

router.get('/', tagsController.getAll);
router.get('/:id', tagsController.findById);
router.post('/', tagsController.save);
router.delete('/:id', tagsController.remove);
router.put('/:id', tagsController.update);

module.exports = router;
