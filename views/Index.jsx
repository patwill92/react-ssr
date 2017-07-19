import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';


class Index extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      items: ['panel1', 'panel2', 'panel3']
    }
  }
  render() {
    const {custom} = this.props;
    const items = this.state.items.map((item, i) => (
      <div key={item} onClick={() => this.handleRemove(i)}>
        {item}
      </div>
    ));
    let myImage = [1,2,3];
    myImage = myImage.map((i, index) => {
      return <div key={index} className="col-sm-6 col-md-4">
        <div className="thumbnail">
          <img src="https://www.e-vita.ro/image/cache/data/4-500x500.png" />
          <div className="caption">
            <h3>Thumbnail label</h3>
            <p>...</p>
            <p><a className="btn btn-primary" role="button">Button</a></p>
          </div>
        </div>
      </div>
    })

    return (
      <div className="container">
        <div className="jumbotron">
          <h1>Home Page</h1>
          <p>Nice subtitle</p>
        </div>
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">Panel title</h3>
          </div>
          <div className="panel-body">
            <div className="row">
              {myImage}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const wrapper = connect(
  (state) => {
    return { custom: state };
  }
);

export default wrapper(Index);