import React, { Component } from "react";
import { connect } from "react-redux";
class UnconnectedFooter extends Component {
  render = () => {
    return (
      <div className="FooterContainer">
        <div className="textFooterContainer">Fluffy Buddies - Montreal</div>
        <div className="textFooterContainer">
          Contact: memberservices@fluffybuddies.ca
        </div>
      </div>
    );
  };
}
let Footer = connect()(UnconnectedFooter);
export default Footer;
