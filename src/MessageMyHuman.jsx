import React, { Component } from "react";
import { connect } from "react-redux";
class UnconnectedMessageMyHuman extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dogProfile: {
        dogName: ""
      },
      humanProfile: {
        firstName: "",
        lastName: ""
      }
    };
  }
  componentDidMount = async () => {
    let humanResponse = await fetch("/humanProfile");
    console.log("request to get human Profile");
    let humanResponseBody = await humanResponse.text();
    let parseHuman = JSON.parse(humanResponseBody);
    console.log("parseHuman:", parseHuman);
    if (parseHuman.success) {
      this.setState({ humanProfile: parseHuman.humanProfile });
    }
    let dogId = this.props.dogID;
    let data = new FormData();
    data.append("dog_id", dogId);
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

  render = () => {
    if (this.state.humanProfile.length > 0) {
      return (
        <form onSubmit={this.handleSubmit}>
          <div>
            Form:
            {this.state.humanProfile.firstName +
              " " +
              humanProfile.lastName}{" "}
          </div>
          <div>To: {this.state.dogProfile.dogName}</div>
          <div>
            <div>Message</div>
            <input type="text" onChange={this.handleMessageToBeSent}></input>
          </div>
        </form>
      );
    }
  };
}
let MessageMyHuman = connect()(UnconnectedMessageMyHuman);
export default MessageMyHuman;
