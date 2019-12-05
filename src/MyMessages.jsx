import React, { Component } from "react";
import { connect } from "react-redux";
class UnconnectedMyMessages extends Component {
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
    return (
      <div>
        <div>My Messages</div>
        <div>
          {this.state.dogProfiles.map(profile => {
            let name = profile.dogName;
            let messages = profile.messages.map(message => {
              return <div>{message}</div>;
            });

            return (
              <div>
                <div>Name: {name} </div>
                <div>Messages: {messages}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
}

let MyMessages = connect()(UnconnectedMyMessages);
export default MyMessages;
