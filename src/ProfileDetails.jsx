import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "./Footer.jsx";

class UnconnectedProfileDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dogProfile: [],
      humanProfile: {
        neighborhoodsClicked: [],
        humanAvailabilities: []
      }
    };
  }

  componentDidMount = async () => {
    let dogId = this.props.dogId;
    let data = new FormData();
    data.append("dog_id", dogId);
    let response = await fetch("/getADogProfile", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let parse = JSON.parse(responseBody);
    if (parse.success) {
      this.setState({ dogProfile: parse.dog });
    }
    let data2 = new FormData();
    data2.append("dog_id", dogId);
    let humanResponse = await fetch("/humanProfileByDogId", {
      method: "POST",
      body: data2
    });
    let responseHumanBody = await humanResponse.text();
    let parseHuman = JSON.parse(responseHumanBody);
    if (parseHuman.success) {
      this.setState({ humanProfile: parseHuman.humanProfile });
    }
    if (!parseHuman.success) {
      window.alert("The human wasn't found");
    }
  };

  render = () => {
    if (this.props.loggedIn === false) {
      return (
        <div>
          <PleaseLogin />
        </div>
      );
    }
    if (this.props.loggedIn === true)
      return (
        <div className="createDogContainer">
          <img className="profileDetailsImage" src="/BannerWide2.jpg" />
          <div className="profileDetailsCard">
            <div>
              <div className="profileDetailsCenter">
                <div className="profileDetailsName">
                  {this.state.dogProfile.dogName}
                </div>
                <div>
                  <img
                    className="profileDetailsPicture"
                    src={this.state.dogProfile.frontendPath}
                  />
                </div>
              </div>
              <div className="wideScreenProfileDetailsCard">
                <div className="profileDetailsText">
                  <div className="wideScreenProfileDetailsFloatLeft">
                    <div className="profileDetailsText wideScreenProfileDetailsTextFirstLine">
                      <span className="bold">Age: </span>{" "}
                      {this.state.dogProfile.dogAge}
                    </div>
                    <div className="profileDetailsText wideScreenProfileDetailsTextFirstLine">
                      <span className="bold"> Breed: </span>{" "}
                      {this.state.dogProfile.dogBreed}
                    </div>
                    <div className="profileDetailsText wideScreenProfileDetailsTextFirstLine">
                      <span className="bold">Gender: </span>{" "}
                      {this.state.dogProfile.dogSex}
                    </div>
                  </div>
                  <div className="wideScreenProfileDetailsFloatLeft">
                    <div className="profileDetailsText wideScreenProfileDetailsTextSecondLine">
                      <span className="bold">Weight: </span>
                      {this.state.dogProfile.dogWeight}
                    </div>
                    <div className="profileDetailsText wideScreenProfileDetailsTextSecondLine">
                      <span className="bold">Height: </span>{" "}
                      {this.state.dogProfile.dogHeight}
                    </div>
                    <div className="profileDetailsText wideScreenProfileDetailsTextSecondLine">
                      <span className="bold">Energy Level: </span>{" "}
                      {this.state.dogProfile.energyLevel}{" "}
                    </div>
                  </div>
                  <div className="wideScreenProfileDetailsFloatLeft">
                    <div className="profileDetailsText wideScreenProfileDetailsText3-4-5Line">
                      <span className="bold">Interests: </span>{" "}
                      {this.state.dogProfile.interests}
                    </div>
                  </div>
                  <div className="wideScreenProfileDetailsFloatLeft">
                    <div className="profileDetailsText wideScreenProfileDetailsText3-4-5Line">
                      <span className="bold">Likes: </span>{" "}
                      {this.state.dogProfile.likes}
                    </div>
                  </div>
                  <div className="wideScreenProfileDetailsFloatLeft">
                    <div className="profileDetailsText wideScreenProfileDetailsText3-4-5Line">
                      <span className="bold">Looking for: </span>{" "}
                      {this.state.dogProfile.lookingFor}
                    </div>
                  </div>
                  <div className="wideScreenProfileDetailsFloatLeft wideScreenProfileDetailsText">
                    <div className="profileDetailsText wideScreenProfileDetailsText">
                      <span className="bold">
                        {" "}
                        My usual neighborhoods are:{" "}
                      </span>
                      {Object.keys(
                        this.state.humanProfile.neighborhoodsClicked
                      ).map(key => {
                        return <div className="profileDetailsList">{key}</div>;
                      })}
                    </div>
                    <div className="profileDetailsText wideScreenProfileDetailsText">
                      <span className="bold">
                        My human is usually available to escort me on:{" "}
                      </span>
                      {Object.keys(
                        this.state.humanProfile.humanAvailabilities
                      ).map(key => {
                        return <div className="profileDetailsList">{key}</div>;
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="profileDetailsLink">
              <div>
                <Link
                  className="profileDetailsMessageMyHuman"
                  to={"/messageMyHuman/" + this.state.dogProfile._id}
                >
                  Message my Human
                </Link>
              </div>
              <div>
                <Link
                  className=" profileDetailsMessageMyHuman profileDetailsBackToFindBuddies"
                  to="/allProfiles"
                >
                  Back to Find Buddies
                </Link>
              </div>
            </div>
          </div>
          <div>
            <Footer />
          </div>
        </div>
      );
  };
}
let mapStateToProps = state => {
  console.log("state", state);
  return {
    loggedIn: state.loggedIn
  };
};
let ProfileDetails = connect(mapStateToProps)(UnconnectedProfileDetails);
export default ProfileDetails;
