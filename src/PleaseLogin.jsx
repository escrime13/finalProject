import React, { Component } from "react";
import { connect } from "react-redux";
import Footer from "./Footer.jsx";
class UnconnectedPleaseLogin extends Component {
  render = () => {
    return (
      <div>
        <div className="allProfilesContainer">
          <div className="allProfilesPleaseLogin">
            <div>
              <img
                className="allProfilesPleaseLoginImage"
                src="SingleDog.PNG"
              />
            </div>
            <div>Please login</div>
          </div>
          <Footer />
        </div>
      </div>
    );
  };
}
let PleaseLogin = connect()(UnconnectedPleaseLogin);
export default PleaseLogin;
