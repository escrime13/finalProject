import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class UnconnectedHomePage extends Component {
  render = () => {
    return (
      <div className="HomePageContainer">
        <h2 className="titleHomePage">HomePage</h2>
        <div>
          <Link className="link" to="/myMessages">
            See My Messages
          </Link>
        </div>
        <div>
          <Link className="link" to="/createdog">
            Create New Dog Profile
          </Link>
        </div>
        <div>
          <Link className="link" to="/mydogs">
            {" "}
            My Dog(s) Profile(s)
          </Link>
        </div>
        <div>
          <Link className="link" to="/allProfiles">
            Browse Dogs
          </Link>
        </div>
        <div>
          <Link className="link" to="/selectDog">
            Edit Dogs Profiles
          </Link>
        </div>
        <div>
          <Link className="link" to="/humanEdit">
            Edit Human Profile
          </Link>
        </div>
      </div>
    );
  };
}
let HomePage = connect()(UnconnectedHomePage);
export default HomePage;
