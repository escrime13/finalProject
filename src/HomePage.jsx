import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "./Footer.jsx";
class UnconnectedHomePage extends Component {
  render = () => {
    return (
      <div className="homePageContainer">
        <div>
          <img className="homePageImage" src="/PlayTime.JPG" />
        </div>
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
        <div>
          <Footer />
        </div>
      </div>
    );
  };
}
let HomePage = connect()(UnconnectedHomePage);
export default HomePage;
