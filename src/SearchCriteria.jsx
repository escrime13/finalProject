import React, { Component } from "react";
import { connect } from "react-redux";
class UnconnectedSearchCriteria extends Component {
  //Provide search criteria to filter results
}
let SearchCriteria = connect()(UnconnectedSearchCriteria);
export default SearchCriteria;
