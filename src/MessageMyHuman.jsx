import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "./Footer.jsx";
class UnconnectedMessageMyHuman extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dogProfile: {},
      humanProfile: {},
      message: {}
    };
  }
  componentDidMount = async () => {
    let humanResponse = await fetch("/humanProfile");
    let humanResponseBody = await humanResponse.text();
    let parseHuman = JSON.parse(humanResponseBody);
    if (parseHuman.success) {
      this.setState({ humanProfile: parseHuman.humanProfile });
    }
    let dog_id = this.props.dogID;
    let data = new FormData();
    data.append("dog_id", dog_id);
    let response = await fetch("/getADogProfile", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let parse = JSON.parse(responseBody);
    if (parse.success) {
      this.setState({ dogProfile: parse.dog });
    }
  };
  handleMessageToBeSent = event => {
    console.log("message to be sent:", event.target.value);
    this.setState({
      message: {
        from: this.state.humanProfile.humanFirstName,
        message: event.target.value
      }
    });
  };
  handleSubmit = async event => {
    event.preventDefault();
    console.log("updating dogProfile with message");
    let dog_id = this.props.dogID;
    let message = this.state.message;
    let data = new FormData();
    data.append("dog_id", dog_id);
    data.append("message", JSON.stringify(message));
    let response = await fetch("/updateDogProfileWithMessage", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let parse = JSON.parse(responseBody);
    if (parse.success) {
      window.alert("Message sent");
      return;
    }
    if (!parse.success) {
      console.log("ERROR");
      return;
    }
  };
  render = () => {
    if (
      Object.keys(this.state.humanProfile).length > 0 &&
      Object.keys(this.state.dogProfile).length > 0
    ) {
      return (
        <div className="createDogContainer">
          <img className="messageMyHumanImage" src="/FluffyLogoWHeart2.png" />
          <div className="messageMyHumanContentContainer">
            <form onSubmit={this.handleSubmit}>
              <div className="messageMyHumanGrid">
                <div>
                  <span className="bold">From: </span>
                  {this.state.humanProfile.humanFirstName}{" "}
                </div>
                <div>
                  <span className="bold">To: </span>{" "}
                  {this.state.dogProfile.dogName}
                </div>
                <div>
                  <div className="bold">Message*: </div>
                </div>
                <div>
                  <div>*Please specify the name of your dog</div>
                </div>
              </div>
              <div>
                <input
                  className="messageMyHumanTextBox"
                  type="text"
                  onChange={this.handleMessageToBeSent}
                ></input>
              </div>

              <input className="createDogSubmit" type="submit"></input>
            </form>
            <div>
              <Link
                className="profileDetailsLink wideScreenMessageMyHumanLink"
                to="/allProfiles"
              >
                Back to Find Buddies
              </Link>{" "}
            </div>{" "}
          </div>{" "}
          <div>
            <Footer />
          </div>
        </div>
      );
    }
    return "Loading...";
  };
}
let MessageMyHuman = connect()(UnconnectedMessageMyHuman);
export default MessageMyHuman;
