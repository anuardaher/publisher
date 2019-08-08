const articlesController = require('../../controllers/articles.controller')
var router = require('express').Router();

router.get('/', articlesController.getAll);
router.get('/:id', articlesController.findById);
router.post('/', articlesController.save);
router.delete('/:id', articlesController.remove);
router.put('/:id', articlesController.update);

module.exports = router;