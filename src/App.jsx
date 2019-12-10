import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, BrowserRouter, Link } from "react-router-dom";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import CreateDog from "./CreateDog.jsx";
import MyDogs from "./MyDogs.jsx";
import AllProfiles from "./AllProfiles.jsx";
import ProfileDetails from "./ProfileDetails.jsx";
import HumanEdit from "./HumanEdit.jsx";
import SelectDogToBeEdited from "./SelectDogToBeEdited.jsx";
import DogEdit from "./DogEdit.jsx";
import MessageMyHuman from "./MessageMyHuman.jsx";
import MyMessages from "./MyMessages.jsx";
import LogOut from "./LogOut.jsx";
import HomePage from "./HomePage.jsx";
let renderLogin = () => {
  return (
    <div>
      <Login />
    </div>
  );
};
let renderMenu = () => {
  return (
    <div>
      <HomePage />
    </div>
  );
};
let renderSelectDogToBeEdited = () => {
  return (
    <div>
      <SelectDogToBeEdited />
    </div>
  );
};
let renderDogEdit = () => {
  return (
    <div>
      <DogEdit />
    </div>
  );
};
let renderHumanEdit = () => {
  return (
    <div>
      <HumanEdit />
    </div>
  );
};
let renderSignUp = () => {
  return (
    <div>
      <Signup />
    </div>
  );
};

let renderCreateDog = () => {
  return (
    <div>
      <CreateDog />
    </div>
  );
};

let renderMyDogs = () => {
  return (
    <div>
      <MyDogs />
    </div>
  );
};

let renderAllProfiles = () => {
  return (
    <div>
      <AllProfiles />
    </div>
  );
};

let renderProfileDetails = routerData => {
  let dogId = routerData.match.params.sid;
  return (
    <div>
      <ProfileDetails dogId={dogId} />
    </div>
  );
};
let renderMessageMyHuman = routerData => {
  let dogID = routerData.match.params.rid;
  return (
    <div>
      <MessageMyHuman dogID={dogID} />
    </div>
  );
};
let renderMyMessages = () => {
  return (
    <div>
      <MyMessages />
    </div>
  );
};
let renderLogOut = () => {
  return (
    <div>
      <LogOut />
    </div>
  );
};
class UnconnectedApp extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path="/" render={renderLogin} />
          <Route exact={true} path="/myMessages" render={renderMyMessages} />
          <Route exact={true} path="/signup" render={renderSignUp} />
          <Route exact={true} path="/createdog" render={renderCreateDog} />
          <Route exact={true} path="/menu" render={renderMenu} />
          <Route exact={true} path="/mydogs" render={renderMyDogs} />
          <Route exact={true} path="/allProfiles" render={renderAllProfiles} />
          <Route exact={true} path="/dogEdit" render={renderDogEdit} />
          <Route exact={true} path="/humanEdit" render={renderHumanEdit} />
          <Route exact={true} path="/logOut" render={renderLogOut} />
          <Route
            exact={true}
            path="/selectDog"
            render={renderSelectDogToBeEdited}
          />
        </div>
        <Route
          exact={true}
          path="/profileDetails/:sid"
          render={renderProfileDetails}
        />
        <Route
          exact={true}
          path="/messageMyHuman/:rid"
          render={renderMessageMyHuman}
        />
      </BrowserRouter>
    );
  }
}
let mapStateToProps = state => {
  console.log("state", state);
  return {};
};
let App = connect(mapStateToProps)(UnconnectedApp);
export default App;
