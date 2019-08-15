require('dotenv-safe').config();
require('./services/mongo');
require('passport');

const flash = require('connect-flash');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const morgan = require('morgan');
const app = require('./server');
const routes = require('./routes');

const init = () => {
  app.set('view engine', 'ejs');
  app.set('views', './src/views');
  app.use(express.static('public'));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(flash());
  app.use(cors());
  app.use(morgan('combined'));
  // session
  app.use(
    session({
      secret: 'secret',
      saveUninitialized: true,
      resave: true,
    })
  );

  // routes
  app.use('/', routes);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
