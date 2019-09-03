require('dotenv-safe').config();
require('./services/mongo');
require('passport');

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = require('./server');
const routes = require('./routes');

const init = () => {
  app.use(express.static('public'));
  app.use(express.json({limit: '50mb'}));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.use(cookieParser());
  app.use(cors());
  app.use(morgan('combined'));

  // routes
  app.use('/', routes);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
