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
    return (
      <div className="createDogContainer">
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
            <div>
              <div>Age: {this.state.dogProfile.dogAge}</div>
              <div>Breed: {this.state.dogProfile.dogBreed}</div>
              <div>Gender: {this.state.dogProfile.dogSex}</div>
              <div>Weight: {this.state.dogProfile.dogWeight}</div>
              <div>Height: {this.state.dogProfile.dogHeight}</div>
              <div>Energy Level: {this.state.dogProfile.energyLevel} </div>
              <div>Interests: {this.state.dogProfile.interests}</div>
              <div>Likes: {this.state.dogProfile.likes}</div>
              <div>Looking for: {this.state.dogProfile.lookingFor}</div>
              <div>
                My usual neighborhoods are:
                {Object.keys(this.state.humanProfile.neighborhoodsClicked).map(
                  key => {
                    return <div>{key}</div>;
                  }
                )}
              </div>
              <div>
                My human is usually available to escort me on:
                {Object.keys(this.state.humanProfile.humanAvailabilities).map(
                  key => {
                    return <div>{key}</div>;
                  }
                )}
              </div>
            </div>
          </div>
          <div>
            <Link to={"/messageMyHuman/" + this.state.dogProfile._id}>
              Message my Human
            </Link>
          </div>
          <div>
            <Link to="/allProfiles">Back to Find Buddies</Link>
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
