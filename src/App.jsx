import React, { Component } from "react";
import { connect } from "react-redux";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import CreateDog from "./CreateDog.jsx";

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

  handleSignUp = () => {
    console.log("SingUp button clicked");
    this.props.dispatch({
      type: "sign-up"
    });
  };

  render = () => {
    if (this.props.loggedIn) {
      return <div></div>;
    }
    if (this.props.createDog) {
      return (
        <div>
          <h1>Create a profile for your dog!</h1>
          <div>
            You must create at least 1 dog profile in order to view dogs profile
          </div>
          <CreateDog />
        </div>
      );
    }
    if (this.props.signUp) {
      return (
        <div>
          <h1>Signup</h1>
          <Signup />
        </div>
      );
    }
    return (
      <div>
        <h1>Login</h1>
        <Login />
        <button onClick={this.handleSignUp}>Signup</button>
      </div>
    );
  };
}
let mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    signUp: state.signUp,
    createDog: state.createDog
  };
};
let App = connect(mapStateToProps)(UnconnectedApp);
export default App;
