import React from 'react';
import { connect } from 'react-redux';

class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {value: ''}

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render(){
    const { custom } = this.props;
    let signupError;
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
          <h1>Login</h1>
        </div>
        <div style={{display: Array.isArray(custom.errorSignup) ? 'block' : 'none'}}
             className="alert alert-danger">
          {signupError}
        </div>
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">Welcome</h3>
          </div>
          <div className="panel-body">
            <form method="post">
              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control"
                       name="email" placeholder="Email"
                       value={this.state.value} onChange={this.handleChange}/>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" name="password" placeholder="Password"/>
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

export default wrapper(Login);