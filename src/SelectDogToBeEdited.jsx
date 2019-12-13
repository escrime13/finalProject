import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "./Footer.jsx";
import PleaseLogin from "./PleaseLogin.jsx";
class UnconnectedSelectDogToBeEdited extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dogProfiles: []
    };
  }
  componentDidMount = async () => {
    let response = await fetch("/dogProfiles");
    let responseBody = await response.text();
    console.log("responseBody:", responseBody);
    let parse = JSON.parse(responseBody);
    if (parse.success) {
      this.setState({
        dogProfiles: parse.dogProfiles
      });
    }
    if (parse.success === false) {
      window.alert("There are no dogs profile associated to this human");
    }
  };

  handleChangeInDogProfile = dogId => {
    this.props.dispatch({ type: "edit-dog", eDog: dogId });
  };

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
          <div className="containerFormSignup">
            <img className="editDogImage" src="/EditDog.jpg" />
            <div className="editDogText">Select the Profile to be Edited</div>
            {this.state.dogProfiles.map(dog => {
              let dogName = dog.dogName;
              let dogId = dog._id;
              return (
                <div className="dogEditCheckBox editDogCheckBoxWideScreenInline">
                  <input
                    type="checkbox"
                    className="dogEditFontSize"
                    onChange={() => {
                      this.handleChangeInDogProfile(dogId);
                    }}
                  />
                  {"  " + dogName}
                </div>
              );
            })}
            <div>
              <Link className="dogEditLink" to="/dogEdit">
                Edit Dog Profile
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      );
    }
  };
}
let mapStateToProps = state => {
  console.log("state", state);
  return {
    loggedIn: state.loggedIn,
    dogToEdit: state.dogToEdit
  };
};
let SelectDogToBeEdited = connect(mapStateToProps)(
  UnconnectedSelectDogToBeEdited
);
export default SelectDogToBeEdited;
