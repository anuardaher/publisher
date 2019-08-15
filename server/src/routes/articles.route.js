const router = require('express').Router();
const articlesController = require('../controllers/articles.controller');

router.get('/', articlesController.getAll);
router.get('/:id', articlesController.findById);
router.post('/', articlesController.save);
router.delete('/:id', articlesController.remove);
router.put('/:id', articlesController.update);

module.exports = router;
