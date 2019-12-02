import React, { Component } from "react";
import { connect } from "react-redux";
class UnconnectedMyDogs extends Component {
  //display the user dog profiles
  //allow to edit/delete dog profiles
}
let MyDogs = connect()(UnconnectedMyDogs);
export default MyDogs;
