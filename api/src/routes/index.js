const router = require('express').Router();

router.use('/api/v1/users', require('./users.route'));
router.use('/api/v1/articles', require('./articles.route'));
router.use('/api/v1/tags', require('./tags.route'));
router.use('/api/v1/routines', require('./routines.route'))

router.use('/api/v1/auth', require('./auth'));

module.exports = router;
