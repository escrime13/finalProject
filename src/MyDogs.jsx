import React, { Component } from "react";
import { connect } from "react-redux";
import Footer from "./Footer.jsx";
import PleaseLogin from "./PleaseLogin.jsx";
class UnconnectedMyDogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dogProfiles: []
    };
  }

  componentDidMount = async () => {
    let response = await fetch("/dogProfiles");
    let responseBody = await response.text();
    let parse = JSON.parse(responseBody);
    if (parse.success) {
      console.log("dogProfiles:", parse.dogProfiles);
      this.setState({ dogProfiles: parse.dogProfiles });
      console.log("this.state.dogProfiles:", this.state.dogProfiles);
      console.log("dogProfilesArrayLength:", this.state.dogProfiles.length);
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
          <img className="myDogsLogo" src="/Logo.JPG" />
          <div>
            {this.state.dogProfiles.map(profile => {
              let profileImage = profile.frontendPath;
              let name = profile.dogName;
              let age = profile.dogAge;
              let breed = profile.dogBreed;
              let sex = profile.dogSex;
              let weight = profile.dogWeight;
              let height = profile.dogHeight;
              let energyLevel = profile.energyLevel;
              let interests = profile.interests;
              let likes = profile.likes;
              let lookingFor = profile.lookingFor;
              return (
                <div className="profileDetailsCard">
                  <div className="profileDetailsCenter">
                    <div className="profileDetailsName"> {name}</div>
                    <div>
                      <img
                        className="profileDetailsPicture"
                        src={profileImage}
                      />
                    </div>
                  </div>
                  <div className="profileDetailsText">
                    <div className="profileDetailsText">
                      {" "}
                      <span className="bold">Age: </span>
                      {age}
                    </div>
                    <div className="profileDetailsText">
                      <span className="bold">Breed: </span>
                      {breed}
                    </div>
                    <div className="profileDetailsText">
                      <span className="bold">Gender: </span>
                      {sex}
                    </div>
                    <div className="profileDetailsText">
                      <span className="bold">Weight: </span>
                      {weight}
                    </div>
                    <div className="profileDetailsText">
                      <span className="bold">Height: </span>
                      {height}
                    </div>
                    <div className="profileDetailsText">
                      <span className="bold">Energy Level:</span> {energyLevel}{" "}
                    </div>
                    <div className="profileDetailsText">
                      <span className="bold">Interests: </span>
                      {interests}
                    </div>
                    <div className="profileDetailsText">
                      <span className="bold">Likes:</span> {likes}
                    </div>
                    <div className="profileDetailsText">
                      <span className="bold">Looking for: </span>
                      {lookingFor}
                    </div>
                  </div>
                </div>
              );
            })}
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

let MyDogs = connect(mapStateToProps)(UnconnectedMyDogs);
export default MyDogs;
