import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class UnconnectedFooter extends Component {
  render = () => {
    return (
      <div className="FooterContainer">
        <div className="textFooterContainer">Fluffy Buddies - Montreal</div>
        <div className="textFooterContainer">
          Contact: memberservices@fluffybuddies.ca
        </div>
        <div className="footerLink">
          <Link className="footerLink" to="/menu">
            Home Page |{" "}
          </Link>
          <Link className="footerLink" to="logOut">
            Logout |
          </Link>
          <Link className="footerLink" to="/">
            Login
          </Link>
        </div>
      </div>
    );
  };
}
let Footer = connect()(UnconnectedFooter);
export default Footer;
