const express = require('express');
require('./services/mongo');
require('./config/passport');

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Server localhost is running on ${process.env.PORT}`);
});

module.exports = app;
