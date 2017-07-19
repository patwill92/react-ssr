const Redux = require('redux');
const ReactRouter = require('react-router');
const ReactDOMServer = require('react-dom/server');
const React = require('react');
const Provider = require('react-redux').Provider;
import User from '../models/user'

let reducer = state => state

let myState = (initialState, request, response) => {
  var store = Redux.createStore(reducer, initialState);

  ReactRouter.match({
    routes: require('./routes.jsx'),
    location: request.url
  }, function (error, redirectLocation, renderProps) {
    if (renderProps) {
      var html = ReactDOMServer.renderToString(
        <Provider store={store}>
          <ReactRouter.RouterContext {...renderProps} />
        </Provider>
      );
      response.send(html);
    } else {
      response.status(404).send('Not Found');
    }
  });
}

// let authenticated = (req, res, next) => {
//   if(req.isAuthenticated()){
//     console.log(req.isAuthenticated())
//     return next();
//   } else{
//     req.flash('error_msg', 'You are not logged in');
//     return next();
//   }
// }

module.exports = {
  reducer,
  myState
  // authenticated
};