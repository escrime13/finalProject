import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./main.css";
class UnconnectedAllProfiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dogProfiles: []
    };
  }

  componentDidMount = async () => {
    let response = await fetch("/allDogsProfiles");
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
      return <div>Please login</div>;
    }
    if (this.props.loggedIn === true)
      return (
        <div>
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
              let dogId = profile._id;
              return (
                <div>
                  <div>
                    <img src={profileImage} />
                  </div>
                  <div>Name: {name}</div>
                  <div> Age: {age}</div>
                  <div>Sex: {sex}</div>
                  <div>Energy Level: {energyLevel} </div>
                  <div>Looking for: {lookingFor}</div>
                  <div>
                    <Link to={"/profileDetails/" + dogId}>
                      See Profile Details
                    </Link>
                  </div>
                </div>
              );
            })}
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

let AllProfiles = connect(mapStateToProps)(UnconnectedAllProfiles);
export default AllProfiles;
