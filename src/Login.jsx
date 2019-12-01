import React, { Component } from "react";
import { connect } from "react-redux";
class UnconnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: " ",
      password: " "
    };
  }
  handleUserNameChange = event => {
    console.log("userName", event.target.value);
    this.setState({ userName: event.target.value });
  };
  handlePasswordChange = event => {
    console.log("password", event.target.value);
    this.setState({ password: event.target.value });
  };
  handleSubmit = async event => {
    event.preventDefault();
    console.log("login form submitted");
    let data = new FormData();
    data.append("userName", this.state.userName);
    data.append("password", this.state.password);
    let response = await fetch("/login", { method: "POST", body: data });
    let responseBody = await response.text();
    let parse = JSON.parse(responseBody);
    if (parse.success) {
      this.props.dispatch({
        type: "login-success"
      });
      return;
    }
    window.alert("Invalid username or password.");
  };
  render = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>Account Username</div>
        <div>
          <input type="text" onChange={this.handleUserNameChange} />
        </div>
        <div> Account Password</div>
        <div>
          <input type="text" onChange={this.handlePasswordChange} />
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    );
  };
}
let Login = connect()(UnconnectedLogin);
export default Login;
