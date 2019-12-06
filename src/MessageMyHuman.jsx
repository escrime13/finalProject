import React, { Component } from "react";
import { connect } from "react-redux";
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
        from:
          this.state.humanProfile.humanFirstName +
          " " +
          this.state.humanProfile.humanLastName,
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
    }
    if (!parse.success) {
      console.log("ERROR");
    }
  };
  render = () => {
    if (
      Object.keys(this.state.humanProfile).length > 0 &&
      Object.keys(this.state.dogProfile).length > 0
    ) {
      console.log(
        "what is not printed:",
        this.state.humanProfile.firstName,
        this.state.humanProfile.lastName
      );
      return (
        <form onSubmit={this.handleSubmit}>
          <div>
            From:
            {this.state.humanProfile.humanFirstName +
              " " +
              this.state.humanProfile.humanLastName}{" "}
          </div>
          <div>To: {this.state.dogProfile.dogName}</div>
          <div>
            <div>Message: </div>
            <input type="text" onChange={this.handleMessageToBeSent}></input>
          </div>
          <input type="submit"></input>
        </form>
      );
    }
    return "Loading...";
  };
}
let MessageMyHuman = connect()(UnconnectedMessageMyHuman);
export default MessageMyHuman;
