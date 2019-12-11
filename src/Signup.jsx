import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Footer from "./Footer.jsx";
let neighborhoodsArray = [
  { id: "Ahuntsic-Cartierville" },
  { id: "Côte-des-Neiges-Notre-Dame-de-Grâce" },
  { id: "The Plateau" },
  { id: "Mile End" },
  { id: "Little Portugal" },
  { id: "Griffintown and Goose Village" },
  { id: "Pointe-Saint-Charles" },
  { id: "L'Île-Bizard-Sainte-Geneviève" },
  { id: "Mercier-Hochelaga-Maisonneuve" },
  { id: "Montréal-Nord" },
  { id: "Outremont" },
  { id: "Pierrefonds-Roxboro" },
  { id: "Rivière-des-Prairies-Pointe-aux-Trembles" },
  { id: "Rosemont-La Petite-Patrie" },
  { id: "Saint-Laurent" },
  { id: "Saint-Léonard" },
  { id: "Verdun" },
  { id: "Ville-Marie" },
  { id: "Villeray-Saint-Michel-Parc-Extension" },
  { id: "West Island" },
  { id: "Westmount" }
];
let humanAvailabilitiesArray = [
  { id: 1, time: "Weekdays/Mornings" },
  { id: 2, time: "Weekdays/Afternoons" },
  { id: 3, time: "Weekdays/Nights" },
  { id: 4, time: "Weekend/Mornings" },
  { id: 5, time: "Weekend/Afternoons" },
  { id: 6, time: "Weekend/Nights" }
];
class UnconnectedSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: " ",
      password: " ",
      firstName: " ",
      lastName: " ",
      neighborhoodsClicked: [],
      humanAvailabilities: []
    };
  }
  handleUserNameChange = event => {
    console.log("new userName", event.target.value);
    this.setState({ userName: event.target.value });
  };
  handlePasswordChange = event => {
    console.log("new password", event.target.value);
    this.setState({ password: event.target.value });
  };
  handleFirstNameChange = event => {
    console.log("human first name", event.target.value);
    this.setState({ firstName: event.target.value });
  };
  handleLastNameChange = event => {
    console.log("human last name", event.target.value);
    this.setState({ lastName: event.target.value });
  };
  handleChangeNeighborhoods = id => {
    let newClicked = { ...this.state.neighborhoodsClicked };
    newClicked[id] = !this.state.neighborhoodsClicked[id];
    this.setState({ neighborhoodsClicked: newClicked });
  };
  handleChangeAvailabilities = time => {
    let newClicked = { ...this.state.humanAvailabilities };
    newClicked[time] = !this.state.humanAvailabilities[time];
    this.setState({ humanAvailabilities: newClicked });
  };

  handleSubmit = async event => {
    event.preventDefault();
    console.log("signup form submitted");
    let data = new FormData();
    data.append("userName", this.state.userName);
    data.append("password", this.state.password);
    data.append("humanFirstName", this.state.firstName);
    data.append("humanLastName", this.state.lastName);
    data.append(
      "neighborhoodsClicked",
      JSON.stringify(this.state.neighborhoodsClicked)
    );
    data.append(
      "humanAvailabilities",
      JSON.stringify(this.state.humanAvailabilities)
    );
    let response = await fetch("/signup", { method: "POST", body: data });
    let responseBody = await response.text();
    let parse = JSON.parse(responseBody);
    if (parse.success) {
      this.props.dispatch({
        type: "login-success"
      });
      window.alert("Signup was successful");
      return;
    }
    window.alert("This username is already taken. Please try something else.");
  };
  render = () => {
    if (this.props.loggedIn === false) {
      return (
        <div className="createDogContainer">
          <div className="headerContainerSignup">
            <img className="imgLogoSignupLeft" src="/SingleDog.PNG" />
            <div className="titleSignup">
              <div>Dear Human,</div> First, tell us a bit about you!
            </div>
          </div>
          <div className="containerFormSignup">
            <form onSubmit={this.handleSubmit}>
              <div className="textInputSignup">
                <div className="formSignup">Username</div>
                <div>
                  <input
                    type="text"
                    className="createDogInputText "
                    onChange={this.handleUserNameChange}
                  />
                </div>
                <div className="formSignup">Password</div>
                <div>
                  <input
                    type="text"
                    className="createDogInputText"
                    onChange={this.handlePasswordChange}
                  />
                </div>
                <div className="formSignup">First Name:</div>
                <div>
                  <input
                    type="text"
                    className="createDogInputText"
                    onChange={this.handleFirstNameChange}
                  />
                </div>
                <div className="formSignup">Last Name: </div>
                <div>
                  <input
                    type="text"
                    className="createDogInputText"
                    onChange={this.handleLastNameChange}
                  />
                </div>
              </div>
              <div className="formSignup playDateSignup">
                Neighborhoods where you could go for doggy play dates?{" "}
              </div>
              <div>
                {neighborhoodsArray.map(area => {
                  return (
                    <div className="checkboxSignup">
                      <input
                        type="checkbox"
                        onChange={() => {
                          this.handleChangeNeighborhoods(area.id);
                        }}
                      />
                      {" " + area.id}
                    </div>
                  );
                })}{" "}
              </div>
              <div className="formSignup playDateSignup">
                When are you usually available to accompany you dog(s) on play
                dates?
              </div>
              <div>
                {humanAvailabilitiesArray.map(time => {
                  return (
                    <div>
                      <input
                        type="checkbox"
                        onChange={() => {
                          this.handleChangeAvailabilities(time.time);
                        }}
                      />
                      {" " + time.time}
                    </div>
                  );
                })}
              </div>
              <div>
                <input className="formSignup createDogSubmit" type="submit" />
              </div>
            </form>
          </div>
          <Footer />
        </div>
      );
    }
    if (this.props.loggedIn === true) {
      return <Redirect to="/createdog" />;
    }
  };
}
let mapStateToProps = state => {
  console.log("state", state);
  return {
    loggedIn: state.loggedIn
  };
};
let Signup = connect(mapStateToProps)(UnconnectedSignup);
export default Signup;
