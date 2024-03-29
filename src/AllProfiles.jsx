import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
import Footer from "./Footer.jsx";
import PleaseLogin from "./PleaseLogin.jsx";

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
    if (this.state.dogProfiles.length > 1) {
      let filteredProfiles = this.state.dogProfiles.filter(profile => {
        return (
          profile.dogName.includes(this.props.query) &&
          profile.lookingFor.includes(this.props.queryLookingFor) &&
          profile.dogAge.includes(this.props.queryAge) &&
          profile.dogSex.includes(this.props.queryDogSex) &&
          profile.dogBreed.includes(this.props.queryBreed) &&
          profile.dogHeight.includes(this.props.queryHeight) &&
          profile.dogWeight.includes(this.props.queryWeight) &&
          profile.energyLevel.includes(this.props.queryEnergyLevel)
        );
      });
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
            <div>
              <img className="allProfilesImage" src="/BannerWide2.jpg" />
              <SearchBar />
            </div>
            <div>
              {filteredProfiles.map(profile => {
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
                  <div className="allProfilesContentContainer">
                    <div className="allProfilesCardContainer">
                      <div className="allProfilesName">{name}</div>{" "}
                      <div>
                        <img
                          className="allProfilesProfilePicture"
                          src={profileImage}
                        />
                      </div>
                      <div className="allProfilesLeftContent">
                        <div>
                          {" "}
                          <span className="bold">Age: </span>
                          {age}
                        </div>
                        <div>
                          {" "}
                          <span className="bold">Gender: </span>
                          {sex}
                        </div>
                        <div>
                          <span className="bold">Energy Level: </span>
                          {energyLevel}
                        </div>
                        <div>
                          <span className="bold">Looking for: </span>
                          {lookingFor}
                        </div>
                      </div>
                      <div className="allProfilesLink">
                        <Link to={"/profileDetails/" + dogId}>
                          See Profile Details
                        </Link>
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
    }
    return "Loading...";
  };
}
let mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    query: state.searchQuery,
    queryLookingFor: state.queryLookingFor,
    queryAge: state.queryAge,
    queryDogSex: state.queryDogSex,
    queryBreed: state.queryBreed,
    queryHeight: state.queryHeight,
    queryWeight: state.queryWeight,
    queryEnergyLevel: state.queryEnergyLevel
  };
};

let AllProfiles = connect(mapStateToProps)(UnconnectedAllProfiles);
export default AllProfiles;
