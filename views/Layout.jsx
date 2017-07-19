import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import axios from 'axios';

class Layout extends React.Component {
  constructor() {
    super();
  }

  render() {
    const {custom} = this.props;
    return (
      <html>
      <head>
        <title>{custom.title}</title>
        <link rel='stylesheet' href='/bootstrap.css'/>
        <link rel='stylesheet' href='/style.css'/>
        <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'/>
        <script src="https://use.fontawesome.com/666a438ab6.js"></script>
      </head>
      <body>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">{custom.user}</Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              <li >
                <Link to="/about">About</Link>
              </li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                   aria-expanded="false">Services <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><a href="#">Embroidery</a></li>
                  <li><a href="#">Silk Screen</a></li>
                  <li><a href="#">Printing</a></li>
                  <li><a href="#">Contact Us</a></li>
                </ul>
              </li>
              <li >
                <Link to="/contact">Contact</Link>
              </li>
              <li >
                <Link to="/products">Products</Link>
              </li>
              <li>
                <a href="http://localhost:8080/shopping-cart">
                  <i className="fa fa-shopping-cart"></i> Shopping Cart <span className="badge">{custom.cart.totalQty}</span>
                </a>
              </li>
              <li style={{display: custom.user ? 'none' : 'block'}}>
                <Link to="/register">Register</Link>
              </li>
              <li style={{display: custom.user ? 'none' : 'block'}}>
                <Link to="/login">Login</Link>
              </li>
              <li style={{display: custom.user ? 'block' : 'none'}}>
                <a href="http://localhost:8080/logout">Logout</a>
              </li>
              <li style={{display: custom.user ? 'block' : 'none'}} className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                   aria-expanded="false">
                  <i className="fa fa-user" aria-hidden="true"></i>
                  User Management
                  <span className="caret"></span>
                </a>
                <ul className="dropdown-menu">
                  <li><a href="#">User Account</a></li>
                  <li role="separator" className="divider"></li>
                  <li><a href="#">Logout</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {this.props.children}
      <div className="container">
        <footer>
          <p className="pull-right"><a href="#">Back to top</a></p>
          <p>&copy; 2016 Company, Inc. &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
        </footer>
      </div>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
      <script src="http://getbootstrap.com/dist/js/bootstrap.min.js"></script>
      <script dangerouslySetInnerHTML={{
        __html: 'window.PROPS=' + JSON.stringify(custom)
      }}/>
      <script src='/bundle.js'/>
      </body>
      </html>
    );
  }
}

const wrapper = connect(
  (state) => {
    return {custom: state};
  }
);

export default wrapper(Layout);
