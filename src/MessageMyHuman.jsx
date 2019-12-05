import React, { Component } from "react";
import { connect } from "react-redux";
class UnconnectedMessageMyHuman extends Component {
  constructor(props) {
    this.state = {
      message: "",
      humanProfile: {
        _id: ""
      }
    };
  }
}

componentDidMount = async () => {
  let dogId = this.props.dogId;
  let data2 = new FormData();
  data2.append("dog_id", dogId);
  let humanResponse = await fetch("/humanProfileByDogId", {
    method: "POST",
    body: data2
  });
  let responseHumanBody = await humanResponse.text();
  let parseHuman = JSON.parse(responseHumanBody);
  if (parseHuman.success) {
    this.setState({ humanProfile: parseHuman.humanProfile });
    console.log("humanProfile:", humanProfile);
  }
  if (!parseHuman.success) {
    window.alert("The human wasn't found");
  }
};
