import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "./Footer.jsx";
class UnconnectedLogOut extends Component {
  componentDidMount = async () => {
    console.log("Request to Logout");
    let response = JSON.parse(
      await (await fetch("/logout", { method: "post" })).text()
    );
    if (response.success) {
      console.log("=========================================LogOut Response");
      console.log(JSON.stringify(response));
      this.props.dispatch({
        type: "logout-success"
      });
    } else {
      window.alert("Logout Failed");
    }
  };

  render = () => {
    return (
      <div className="createDogContainer">
        <div>
          <img className="logoLogOutImage" src="/Logo.JPG" />
          <div className="logOutText">You Have Successfully Logged Out</div>
          <div className="logOutText">See You Soon!</div>
          <Link className="logOutReturnToLogin" to="/">
            {" "}
            Return to Login{" "}
          </Link>
        </div>
        <Footer />
      </div>
    );
  };
}
let mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  };
};
let LogOut = connect(mapStateToProps)(UnconnectedLogOut);
export default LogOut;
