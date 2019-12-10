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
        <div className="humanEditContainer">
          <div>
            <img className="myDogsLogo" src="/Logo.JPG" />
          </div>
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
                <div>
                  <div>
                    <img src={profileImage} />
                  </div>
                  <div>Name: {name}</div>
                  <div> Age: {age}</div>
                  <div>Breed: {breed}</div>
                  <div>Gender: {sex}</div>
                  <div>Weight: {weight}</div>
                  <div>Height: {height}</div>
                  <div>Energy Level: {energyLevel} </div>
                  <div>Interests: {interests}</div>
                  <div>Likes: {likes}</div>
                  <div>Looking for: {lookingFor}</div>
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
