const express = require('express');
require('./services/mongo');
require('./config/passport');

const app = express();

app.listen(process.env.API_PORT, () => {
  console.log(`Server localhost is running on ${process.env.API_PORT}`);
});

module.exports = app;
