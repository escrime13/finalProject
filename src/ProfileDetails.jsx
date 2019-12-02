import React, { Component } from "react";
import { connect } from "react-redux";
class UnconnectedProfileDetails extends Component {
  //view details of a dog profile
}
let ProfileDetails = connect()(UnconnectedProfileDetails);
export default ProfileDetails;
