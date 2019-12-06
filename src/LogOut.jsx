import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class UnconnectedLogOut extends Component {
  handleLogOut = async () => {};
  render = () => {
    return (
      <div>
        <div>You Have Successfuly Logged Out</div>
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
