import React, { Component } from "react";
import { connect } from "react-redux";
import Signup from "./Signup.jsx";

class UnconnectedApp extends Component {
  componentDidMount = () => {
    let checkIfUserLoggedIn = async () => {
      let response = await fetch("/isUserLoggedIn");
      let responseBody = await response.text();
      console.log("response from isUserLoggedIn", responseBody);
      let parsed = JSON.parse(responseBody);
      console.log("parsed", parsed);
      if (parsed.loggedIn) {
        console.log("user loggedIn");
        this.props.dispatch({
          type: "login-success"
        });
        return;
      }
    };
    checkIfUserLoggedIn();
  };
  render = () => {
    if (this.props.loggedIn) {
      return <div></div>;
    }
    return (
      <div>
        <h1>Signup</h1>
        <Signup />
        <h1>Login</h1>
        <Login />
      </div>
    );
  };
}

export default App;
