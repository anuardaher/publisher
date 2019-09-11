const router = require('express').Router();
const authenticateController = require('../controllers/authenticate.controller');
const userSchema = require('../policies/users.schema');
const passport = require('passport');

router.get(
  '/auth/facebook',
  passport.authenticate('facebook', { scope: ['email', 'public_profile'] })
);

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: 'http://localhost:8080/#/',
    session: false,
  }),
  (req, res) => {
    if (req.user._id) {
      res.redirect(`http://localhost:8080/#/feed?user=${req.user._id}`);
    } else {
      req.body = req.user;
      authenticateController.register(req, res);
    }
  }
);

router.post('/login', authenticateController.login);
router.post('/register', userSchema.register, authenticateController.register);
router.get('/socialLogin/:id', authenticateController.socialLogin);

module.exports = router;
