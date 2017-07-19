const express = require('express');
const router = express.Router();
const React = require('react');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
import csrf from 'csurf';
let Cart = require('../models/cart');
const Product = require('../models/product');

const csrfProtection = csrf();
router.use(csrfProtection);

import {myState, authenticated} from './static.jsx';
import { initialState, initState } from '../config/passport';

let notLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};

let isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};

router.get('/logout',isLoggedIn, function(req, res, next){
  req.logout();
  res.redirect('/');
});

router.get('/', function(request, response) {
  initState(request);
  myState(initialState, request, response)
});

router.get('/about', isLoggedIn, function(request, response) {
  initState(request);
  myState(initialState, request, response)
});


router.use('/', notLoggedIn, (req, res, next) => {
  Product.find(function(err, docs){
    let cart = req.session.cart ? req.session.cart : 0;
    initialState.products = docs;
    initialState.cart = cart;
    initState(req);
    next();
  });
});

router.get('/add-item/:id', (req, res, next) => {
  let productId = req.params.id;
  let cart = new Cart(req.session.cart ? req.session.cart : {});
  console.log(productId);
  Product.findById(productId, (err, product) => {
    if(err) {
      return res.redirect('/products');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/products')
  })
});

router.get('/shopping-cart', (req, res, next) => {
  if(!req.session.cart) {
    return myState(initialState, req, res)
  }
  let cart = new Cart(req.session.cart);
  initialState.sCart = cart.generateArray();
  initialState.totalPrice = cart.totalPrice;
  console.log(initialState.sCart);
  console.log(initialState.totalPrice);
  myState(initialState, req, res);
});

router.get('/checkout', (req, res, next) => {
  if(!req.session.cart) {
    return res.redirect('/shopping-cart')
  }
  let cart = new Cart(req.session.cart);
  initialState.sCart = cart.generateArray();
  initialState.totalPrice = cart.totalPrice;
  myState(initialState, req, res);
});

router.get('/products', (request, response, next) => {
  myState(initialState, request, response)
});

router.post('/register', passport.authenticate('local.signup', {
  successRedirect: '/',
  failureRedirect: '/register',
  failureFlash: true
}));

router.get('/register', function(request, response) {
  myState(initialState, request, response)
});

router.get('/login', function(request, response) {
  myState(initialState, request, response)
});

router.post('/login', passport.authenticate('local.signin', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/contact', function(request, response) {
  myState(initialState, request, response);
});

router.post('/contact', (req, res) => {
  let helper = require('sendgrid').mail;

  let from_email = new helper.Email(req.body.email);
  let to_email = new helper.Email('patrick.rw92@gmail.com');
  let subject = `INQUIRY FROM ${req.body.name}`;
  let content = new helper.Content("text/plain", `${req.body.message}`);
  let mail = new helper.Mail(from_email, subject, to_email, content);

  let sg = require('sendgrid')('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');
  let request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });

  sg.API(request, function(error, response) {
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
  })
  res.redirect('/')
});

module.exports = router;
