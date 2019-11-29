import React, { Component } from "react";
import { connect } from "react-redux";
class UnconnectedSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: " ",
      password: " ",
      humanFirstName: " ",
      humanLastName: " ",
      neighborhoods: " ",
      humanAvailabilities: []
    };
  }
  handleUserNameChange = event => {
    console.log("new userName", event.target.value);
    this.setState({ userName: event.target.value });
  };
  handlePasswordChange = event => {
    console.log("new password", event.target.value);
    this.setState({ password: event.target.value });
  };
  handleSubmit = async event => {
    event.preventDefault();
    console.log("signup form submitted");
    let data = new FormData();
    data.append("userName", this.state.userName);
    data.append("password", this.state.password);
    let response = await fetch("/signup", { method: "POST", body: data });
    let responseBody = await response.text();
    let parse = JSON.parse(responseBody);
    if (parse.success) {
      window.alert("Signup was successful");
      this.props.dispatch({
        type: "login-success"
      });
      return;
    }
    window.alert("This username is already taken. Please try something else.");
  };
  render = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        Account Username
        <input type="text" onChange={this.handleUserNameChange} />
        Account Password
        <input type="text" onChange={this.handlePasswordChange} />
        Dear human, please tell us a bit about you: First Name:
        <input type="text" onChange={this.handleFirstNameChange} />
        Last Name:
        <input type="text" onChange={this.handleLastNamedChange} />
        In which neighborhoods could you bring your dog(s) for play dates?
      </form>
    );
  };
}
let Signup = connect()(UnconnectedSignup);
export default Signup;
