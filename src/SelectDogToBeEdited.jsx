import React, { Component } from "react";
import { connect } from "react-redux";
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
      console.log(
        "parse.succes:",
        parse.success,
        "parse.dogProfiles:",
        parse.dogProfiles
      );
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
      return <div>Please Loggin</div>;
    }
    if (this.props.loggedIn === true) {
      console.log("dogProfiles:", this.state.dogProfiles);
      return (
        <div>
          <div>Please Select the Profile to be Edited</div>
          {this.state.dogProfiles.map(dog => {
            let dogName = dog.dogName;
            let dogId = dog._id;
            return (
              <div>
                <input
                  type="checkbox"
                  onChange={() => {
                    this.handleChangeInDogProfile(dogId);
                  }}
                />
                {dogName}
              </div>
            );
          })}
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
