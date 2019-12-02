import React, { Component } from "react";
import { connect } from "react-redux";
class UnconnectedAllProfiles extends Component {
    componentDidMount = () => {
        let getAllProfile = async () => {
          let response = await fetch("");
          let responseBody = await response.text();
          console.log("response from isUserLoggedIn", responseBody);
          let parsed = JSON.parse(responseBody);
          console.log("parsed", parsed);
          if (parsed.loggedIn) {
            console.log("user loggedIn");
            this.props.dispatch({
              type: "login-success"
            });
            return;
          }
        };
        checkIfUserLoggedIn();
  //Display all Dog Profiles
  //Ability to "swipe thru"
}
let AllProfiles = connect()(UnconnectedAllProfiles);
export default AllProfiles;
