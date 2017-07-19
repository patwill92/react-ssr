import React from 'react';
import {connect} from 'react-redux';

class ShoppingCart extends React.Component {
  render() {
    const {custom} = this.props;
    let myCart = custom.sCart ? custom.sCart : false;
    let myProducts;
    let totalPrice = custom.totalPrice;
    myProducts = myCart ? myCart.map((item, index) => {
      let product =
        <li key={item.item._id} className="list-group-item">
          <span className="badge">{item.qty}</span>
          <strong>{item.item.title} </strong>
          <span className="label label-success">$  {item.price} </span>
          <div style={{marginLeft: '5px'}} className="btn-group">
            <button className="btn btn-primary btn-xs dropdown-toggle"
                    type="button" data-toggle="dropdown">Edit <span
              className="caret"></span></button>
            <ul className="dropdown-menu">
              <li><a href="#">Reduce by 1</a></li>
              <li><a href="#">Remove All</a></li>
            </ul>
          </div>
        </li>;
      return product;
    }) : false;
    let showProducts = {
      display: myProducts ? 'block' : 'none'
    };
    let hideProducts = {
      display: myProducts ? 'none' : 'block'
    };
    return (
      <div>
        <div style={showProducts} className="container">
          <div className="jumbotron">
            <h1>Shopping Cart</h1>
            <p>Nice subtitle</p>
          </div>
          <div className="row">
            <div className="col-sm-6 col-md-6 col-md-offset-3 col-sm-offset-3">
              <ul className="list-group">
                {myProducts}
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-md-6 col-md-offset-3 col-sm-offset-3">
              <strong>Total: ${totalPrice}</strong>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-sm-6 col-md-6 col-md-offset-3 col-sm-offset-3">
              <a href="/checkout" type="button" className="btn btn-success">Checkout</a>
            </div>
          </div>
        </div>
        <div style={hideProducts} className="container">
          <div className="row">
            <div className="col-sm-6 col-md-6 col-md-offset-3 col-sm-offset-3">
              <h2>No items in cart </h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const wrapper = connect(
  (state) => {
    return {custom: state};
  }
);

export default wrapper(ShoppingCart);