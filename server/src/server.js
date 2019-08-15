const express = require('express');
require('./services/mongo');

const app = express();

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server ${process.env.HOST} is running on ${process.env.PORT}`);
});

module.exports = app;
