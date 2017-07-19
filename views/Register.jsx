import React from 'react';
import { connect } from 'react-redux';

class Register extends React.Component{

  render(){
    const { custom } = this.props;
    let successMessage;
    let signupError;
    if(custom.success){
      successMessage = (
         <div className="alert alert-success">{custom.success}</div>
      )
    }
    if(custom.errorSignup){
      signupError = (
        custom.errorSignup.map((error, index) => {
          return <p key={index}>{error}</p>
        })
      )
    }
    return (
        <div className="container">
          <div className="jumbotron">
            <h1>Register</h1>
            <p>ASH</p>
          </div>
          {/*{successMessage}*/}
          <div style={{display: Array.isArray(custom.errorSignup) ? 'block' : 'none'}}
               className="alert alert-danger">
            {signupError}
          </div>
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h3 className="panel-title">Join us</h3>
            </div>
            <div className="panel-body">
                <form method="post" action="/register">
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="Name" name="name"/>
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Email" name="email"/>
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Password" name="password"/>
                  </div>
                  <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" placeholder="Password" name="password2"/>
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

export default wrapper(Register);