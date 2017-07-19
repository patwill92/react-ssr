import React from 'react';
import {connect} from 'react-redux';

class Checkout extends React.Component {
  render() {
    const {custom} = this.props;
    let myCart = custom.sCart ? custom.sCart : false;
    let myProducts;
    let totalPrice = custom.totalPrice;
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>Checkout</h1>
          <p>Your Total: ${totalPrice}</p>
        </div>
        <div className="row">
          {/*<form action="/charge" method="post" id="payment-form">*/}
            {/*<div className="form-row">*/}
              {/*<label htmlFor="card-element">*/}
                {/*Credit or debit card*/}
              {/*</label>*/}
              {/*<div id="card-element">*/}
              {/*</div>*/}
              {/*<div id="card-errors" role="alert"></div>*/}
            {/*</div>*/}
            {/*<button>Submit Payment</button>*/}
          {/*</form>*/}
          <div className="col-sm-6 col-md-4 col-md-offset-4 col-sm-offset-3">
            <form action="/" method="POST" id="checkout-form">
              <div className="row">
                <div className="col-xs-12">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" className="form-control" required/>
                  </div>
                </div>
                <div className="col-xs-12">
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" className="form-control" required/>
                  </div>
                </div>
                <hr/>
                <div className="col-xs-12">
                  <div className="form-group">
                    <label htmlFor="cardname">Card Holder Name</label>
                    <input type="text" id="cardname" className="form-control" required/>
                  </div>
                </div>
                <div className="col-xs-12">
                  <div className="form-group">
                    <label htmlFor="cardnumber">Card Number</label>
                    <input type="text" id="cardnumber" className="form-control" required/>
                  </div>
                </div>
                <div className="col-xs-12">
                  <div className="row">
                    <div className="col-xs-3">
                      <div className="form-group">
                        <label htmlFor="cardexpm">Exp Month</label>
                        <input type="text" id="cardexp" className="form-control" required/>
                      </div>
                    </div>
                    <div className="col-xs-3">
                      <div className="form-group">
                        <label htmlFor="cardexpy">Exp Year</label>
                        <input type="text" id="cardexpy" className="form-control" required/>
                      </div>
                    </div>
                    <div className="col-xs-1"></div>
                    <div className="col-xs-2">
                      <div className="form-group">
                        <label htmlFor="cvc">CVC</label>
                        <input type="text" id="cvc" className="form-control" required/>
                      </div>
                    </div>
                    <div className="col-xs-3"></div>
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-success">Buy now</button>
            </form>
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

export default wrapper(Checkout);