import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";

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
      window.alert("Successful Login");
      return;
    }
    window.alert("Invalid username or password.");
  };
  render = () => {
    if (this.props.loggedIn === false)
      return (
        <div className="containerLogin">
          <div>
            {" "}
            <img className="imgLogoLogin" src="/Logo.JPG" />
          </div>
          <div>
            <form className="formLogin" onSubmit={this.handleSubmit}>
              <div className="wideScreenLoginText">Username</div>
              <div>
                <input
                  type="text"
                  className="createDogInputText"
                  onChange={this.handleUserNameChange}
                />
              </div>
              <div className="wideScreenLoginText"> Password</div>
              <div>
                <input
                  type="text"
                  className="createDogInputText"
                  onChange={this.handlePasswordChange}
                />
              </div>
              <div>
                <input className="createDogSubmit" type="submit" />
              </div>
            </form>
          </div>
          <div className="wideScreenLoginFloat">
            <div className="formLoginSignup wideScreenLoginText">
              Not a member yet!
              <div className>
                <Link to="/signup">Signup</Link>
              </div>
            </div>
            <div className="subTitleLogin wideScreenLoginTextSubtitle">
              Where Dogs Find Dogs
            </div>
            <div className="subTitleLogin wideScreenLoginTextSubtitle">
              In the{" "}
            </div>
            <div className="subTitleLogin wideScreenLoginTextSubtitle">
              Greater Montreal Area
            </div>
          </div>
        </div>
      );
    if (this.props.loggedIn === true) {
      return <Redirect to="/menu" />;
    }
  };
}
let mapStateToProps = state => {
  console.log("state", state);
  return {
    loggedIn: state.loggedIn
  };
};
let Login = connect(mapStateToProps)(UnconnectedLogin);
export default Login;
