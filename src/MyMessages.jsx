import React, { Component } from "react";
import { connect } from "react-redux";
import Footer from "./Footer.jsx";
import { Link } from "react-router-dom";
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
  handleDeleteMessage = async (name, message) => {
    event.preventDefault();
    console.log("message to be deleted");
    let data = new FormData();
    data.append("messageToBeDeleted", message);
    data.append("dogName", name);
    let response = await fetch("/deleteMessage", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let parse = JSON.parse(responseBody);
    if (parse.success) {
      window.alert("Message Deleted");
      this.componentDidMount();
      return;
    }
  };
  render = () => {
    if (
      Object.keys(this.state.dogProfiles).length > 0 &&
      Object.keys(this.state.dogProfiles.messages === 0)
    ) {
      return (
        <div className="myMessagesContainer">
          <img className="myMessagesImg" src="/Mail.jpg" />
          <div className="myMessagesNoMessages">
            {" "}
            <div>You have no messages. </div>
            <div>Come back later! </div>
            <div>
              <Footer />
            </div>
          </div>
        </div>
      );
    }
    if (Object.keys(this.state.dogProfiles).length > 0) {
      return (
        <div className="myMessagesContainer">
          <img className="myMessagesImg" src="/Mail.jpg" />
          <div className="myMessagesOverflowContainer">
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
                  <div className="individualMessageContainer">
                    <div>
                      <span className="bold">For:</span> {name}
                    </div>
                    <div>
                      <span className="bold">From: </span>
                      {from}
                    </div>
                    <div className="myMessageInputMessage">
                      {receivedMessage}
                    </div>
                    <button
                      className="myMessageDelete"
                      onClick={() =>
                        this.handleDeleteMessage(name, receivedMessage)
                      }
                      value={receivedMessage}
                    >
                      X
                    </button>
                  </div>
                );
              });
            })}
          </div>
        </div>
      );
    }

    return (
      <div className="myMessagesContainer">
        <img className="myMessagesImg" src="/Mail.jpg" />
        <div className="myMessagesNoMessages">
          {" "}
          <div>You have no messages. </div>
          <div>Come back later! </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    );
  };
}

let MyMessages = connect()(UnconnectedMyMessages);
export default MyMessages;
