var router = require('express').Router();
//api routes
router.use("/users", require('./api/users.route'));
//app routes
router.use("/auth", require('./app/auth.route'));

module.exports = router;