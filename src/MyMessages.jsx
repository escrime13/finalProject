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
    if (Object.keys(this.state.dogProfiles).length > 0) {
      return (
        <div>
          <div>My Messages</div>
          <div>
            {this.state.dogProfiles.map(profile => {
              let name = profile.dogName;
              console.log("profile.dogName:", profile.dogName);
              console.log("profile:", profile);
              let messages = profile.messages;
              console.log("messages:", messages);
              return messages.map(message => {
                let from = message.from;
                console.log("from:", from);
                let receivedMessage = message.message;
                console.log("recievedMessage:", receivedMessage);
                return (
                  <div>
                    <div>For: {name}</div>
                    <div>Form: {from}</div>
                    <div>Message: {receivedMessage}</div>
                  </div>
                );
              });
            })}
          </div>
        </div>
      );
    }

    return <div> Loading...</div>;
  };
}

let MyMessages = connect()(UnconnectedMyMessages);
export default MyMessages;
