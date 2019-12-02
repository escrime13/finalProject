import React, { Component } from "react";
import { connect } from "react-redux";
class UnconnectedSearchResults extends Component {
  //display searchresults
}
let SearchResults = connect()(UnconnectedSearchResults);
export default SearchResults;
