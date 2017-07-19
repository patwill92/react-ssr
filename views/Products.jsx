import React from 'react';
import {connect} from 'react-redux';

class Products extends React.Component {
  render() {
    const {custom} = this.props;
    let myProducts;
    const products = custom.products;
    const style = {
      minHeight: 480 + 'px !important',
      maxHeight: 480 + 'px !important'
    }
    myProducts = products.map((item, index) => {
      let product =
        <div key={index} className="col-sm-6 col-md-4">
          <div className="thumbnail">
            <img style={style} src={item.imagePath} alt="..."/>
            <div className="caption">
              <h3>{item.title}</h3>
              <h4><strong>{`$${item.price}`}</strong></h4>
              <p>{item.description}</p>
              <p>
                <a href={`/add-item/${item._id}`} className="btn btn-primary" role="button">Add Item</a>
              </p>
            </div>
          </div>
        </div>;
      return product;
    });
    return (

    <div className="container">
      <div className="jumbotron">
        <h1>Product's Page</h1>
        <p>Nice subtitle</p>
      </div>
      <div className="row">
        {myProducts}
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

export default wrapper(Products);