const router = require('express').Router();
const authenticateController = require('../controllers/authenticate.controller');
const userSchema = require('../policies/users.schema');

router.get('/auth/facebook');

router.get('/auth/facebook/callback');

router.get('/auth/linkedin');

router.get('/auth/linkedin/callback');

router.route('/login').post(authenticateController.login);

router
  .route('/register')
  .post(userSchema.register, authenticateController.register);

module.exports = router;
