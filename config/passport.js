const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');
const Product = require('../models/product');

let initialState ={};
let initState = (req) => {
  initialState.user = req.user ? req.user.name : false;
  initialState.token  = req.csrfToken();
  // let products = Product.find();
  // initialState.products = products;
};
let messages;
let updateError = (errorMessage) => {
  messages = [];
  let message = errorMessage;
  messages.push(message);
  initialState.errorSignup = messages;
}

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  });
});

passport.use('local.signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done) => {
  let name = req.body.name;
  let password2 = req.body.password2;

  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password', 'Password must be more than 4 characters').isLength({min:4});
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  req.getValidationResult().then((result) => {
    let errors = result.array();
    messages = [];
    errors.forEach((error) => {
      messages.push(error.msg)
    });
    if(messages.length > 0) {
      initialState.errorSignup = messages;
      return done(null, false, req.flash('error', messages));
    }else{
      User.findOne({'email': email}, (err, user) => {
        if(err) {
          return done(err);
        }
        if(user) {
          updateError('Email is already in use.');
          return done(null, false, req.flash('error', messages));
        }
        initialState.errorSignup = '';
        let newUser = new User();
        newUser.name = name;
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save((err, result) => {
          if(err){
            return done(err);
          }
          return done(null, newUser);
        })
      })
    }
  });
}));

passport.use('local.signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done) => {
  req.checkBody('email', 'Email is required').notEmpty()
  req.checkBody('email', 'Email is invalid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();

  req.getValidationResult().then((result) => {
    let errors = result.array();
    messages = [];
    errors.forEach((error) => {
      messages.push(error.msg)
    });
    if(messages.length > 0) {
      initialState.errorSignup = messages;
      return done(null, false, req.flash('error', messages));
    }else{
      User.findOne({'email': email}, (err, user) => {
        if(err) {
          return done(err);
        }
        if(!user) {
          updateError('Email is not registered');
          return done(null, false, req.flash('error', messages));
        }
        user.comparePassword(password, user.password, function(err, isMatch){
          if(err) throw err;
          if(isMatch){
            initialState.errorSignup = '';
            return done(null, user);
          } else {
              updateError('Incorrect Password');
              return done(null, false, req.flash('error', messages));
          }
        })
      })
    }
  });
}));

module.exports = {
  initialState,
  initState
};
