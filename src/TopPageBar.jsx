import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class UnconnectedTopPageBar extends Component {
  render = () => {
    return (
      <div className="TopPageBarContainer">
        <div className="linkToLoginTopPageBar">
          <Link to="/">Login / </Link>
          <Link to="/logOut">LogOut</Link>
        </div>
        <div className="TopPageBarTitle">Fluffy Buddies</div>
        <div className="TopPageBarTitle">Where Dogs Find Dogs</div>
      </div>
    );
  };
}
let TopPageBar = connect()(UnconnectedTopPageBar);
export default TopPageBar;
