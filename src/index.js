require('dotenv-safe').config();
require("./services/mongo")

const app = require('./server');
const routes = require('./routes');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const init = () => {

    app.set('view engine', 'ejs');
    app.set('views', './src/views');
    app.use(express.static('public'));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cookieParser());
    app.use(flash());
    //session
    app.use(session({
        secret: 'secret',
        saveUninitialized: true,
        resave: true
    }));
    //passport
    app.use(passport.initialize());
    app.use(passport.session());
    //routes
    app.use("/", routes)
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();