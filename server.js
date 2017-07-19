require('babel-register')({
    presets: ['react', 'es2015']
});
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

const routes = require('./routes/index');

const app = express();


mongoose.connect('mongodb://localhost/user-data');
require('./config/passport')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(validator());
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { maxAge: 180 * 60 * 1000 }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});
app.use('/', routes);

const PORT = 8080;
app.listen(PORT, function() {
    console.log('http://localhost:' + PORT);
});
