import React from 'react';
import {
    Router,
    Route,
    IndexRoute,
    browserHistory
} from 'react-router';

import Layout from '../views/Layout.jsx';
import Index from '../views/Index.jsx';
import About from '../views/About.jsx';
import Contact from '../views/Contact.jsx';
import Register from '../views/Register.jsx';
import Login from '../views/Login.jsx';
import Products from '../views/Products.jsx';
import ShoppingCart from '../views/ShoppingCart.jsx';
import Checkout from '../views/Checkout.jsx';

module.exports = (
    <Router history={browserHistory}>
        <Route path='/' component={Layout}>
            <IndexRoute component={Index} />
            <Route path='about' component={About} />
            <Route path='contact' component={Contact} />
            <Route path='register' component={Register} />
            <Route path='login' component={Login} />
            <Route path='products' component={Products} />
            <Route path='shopping-cart' component={ShoppingCart} />
            <Route path='checkout' component={Checkout} />
        </Route>
    </Router>
);
