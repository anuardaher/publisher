var router = require('express').Router();
//api routes
router.use("/api/v1/users", require('./api/users.route'));
router.use("/api/v1/articles", require('./api/articles.route'));
router.use("/api/v1/tags", require("./api/tags.route"));
//app routes
router.use("/", require('./auth'));

module.exports = router;