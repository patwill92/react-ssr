import React from 'react';
import { connect } from 'react-redux';

class Contact extends React.Component{
  render(){
    const { custom } = this.props;
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>Contact Page</h1>
          <p>We get back to you quickly!</p>
        </div>
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">Contact Us</h3>
          </div>
          <div className="panel-body">
            <form method="POST">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input name="name" type="text" className="form-control" id="name" placeholder="First/Last Name"/>
              </div>
              <div className="form-group">
                <label htmlFor="name">Email address</label>
                <input name="email" type="email" className="form-control" id="name" placeholder="Email"/>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea name="message" id="message" className="form-control" rows="4"></textarea>
              </div>
              <input type="hidden" name="_csrf" value={custom.token}/>
              <button type="submit" className="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const wrapper = connect(
  (state) => {
    return { custom: state };
  }
);

export default wrapper(Contact);