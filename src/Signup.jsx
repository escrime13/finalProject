import React, { Component } from "react";
import { connect } from "react-redux";
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
    newClicked[id] = !neighborhoodsArray[id];
    this.setState({ neighborhoodsClicked: newClicked });
  };
  handleChangeAvailabilities = time => {
    let newClicked = { ...this.state.humanAvailabilities };
    newClicked[time] = !humanAvailabilitiesArray[time];
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
      window.alert("Signup was successful");
      this.props.dispatch({
        type: "create-dog"
      });
      return;
    }
    window.alert("This username is already taken. Please try something else.");
  };
  render = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>Account Username</div>
        <div>
          <input type="text" onChange={this.handleUserNameChange} />
        </div>
        <div>Account Password</div>
        <div>
          <input type="text" onChange={this.handlePasswordChange} />
        </div>
        <div>
          Dear human, before we fill the profile(s) for your dog(s) please tell
          us a bit about you:
        </div>
        <div>First Name:</div>
        <div>
          <input type="text" onChange={this.handleFirstNameChange} />
        </div>
        <div>Last Name: </div>
        <div>
          <input type="text" onChange={this.handleLastNameChange} />
        </div>
        <div>
          In which neighborhoods would you bring your dog(s) for play dates?{" "}
        </div>
        <div>
          {neighborhoodsArray.map(area => {
            return (
              <div>
                <input
                  type="checkbox"
                  onChange={() => {
                    this.handleChangeNeighborhoods(area.id);
                  }}
                />
                {area.id}
              </div>
            );
          })}{" "}
        </div>
        <div>
          When are you usually available to accompany you dog(s) on play dates?
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
                {time.time}
              </div>
            );
          })}
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    );
  };
}
let Signup = connect()(UnconnectedSignup);
export default Signup;
