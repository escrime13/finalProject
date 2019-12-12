import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "./Footer.jsx";
import PleaseLogin from "./PleaseLogin.jsx";
class UnconnectedHomePage extends Component {
  render = () => {
    if (this.props.loggedIn === false) {
      return (
        <div>
          <PleaseLogin />
        </div>
      );
    }
    if (this.props.loggedIn === true) {
      return (
        <div className="createDogContainer">
          <div className="homePageContent">
            <div>
              <img className="homePageImage" src="/PlayTime.JPG" />
            </div>
            <div className="homePageWideScreenLinkContainer">
              <div className="homePageWideScreenDisplayFlex">
                <div>
                  <img className="homePageFireHydrant" src="/fireHydrant.jpg" />
                  <Link className="linkHome" to="/myMessages">
                    See My Messages
                  </Link>
                </div>
                <div>
                  <img className="homePageFireHydrant" src="/fireHydrant.jpg" />
                  <Link className="linkHome" to="/createdog">
                    Create New Dog Profile
                  </Link>
                </div>
                <div>
                  <img className="homePageFireHydrant" src="/fireHydrant.jpg" />
                  <Link className="linkHome" to="/mydogs">
                    My Dog(s) Profile(s)
                  </Link>
                </div>
              </div>
              <div className="homePageWideScreenFloatContainer">
                <div>
                  <img className="homePageFireHydrant" src="/fireHydrant.jpg" />
                  <Link className="linkHome" to="/allProfiles">
                    Find Buddies
                  </Link>
                </div>
                <div>
                  <img className="homePageFireHydrant" src="/fireHydrant.jpg" />
                  <Link className="linkHome" to="/selectDog">
                    Edit Dogs Profiles
                  </Link>
                </div>
                <div>
                  <img className="homePageFireHydrant" src="/fireHydrant.jpg" />
                  <Link className="linkHome" to="/humanEdit">
                    Edit Human Profile
                  </Link>
                </div>
              </div>
            </div>
            <div></div>
            <Footer />
          </div>
        </div>
      );
    }
  };
}
let mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  };
};
let HomePage = connect(mapStateToProps)(UnconnectedHomePage);
export default HomePage;
