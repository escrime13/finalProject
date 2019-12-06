import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, BrowserRouter, Link, useParams } from "react-router-dom";
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
import SearchBar from "./SearchBar.jsx";
import LogOut from "./LogOut.jsx";
let renderLogin = () => {
  return (
    <div>
      <Login />
      <div>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
};
let renderMenu = () => {
  return (
    <div>
      <div>Menu</div>
      <div>
        <Link to="/myMessages">See My Messages</Link>
      </div>
      <div>
        <Link to="/createdog">Create New Dog Profile</Link>
      </div>
      <div>
        <Link to="/mydogs"> My Dog(s) Profile(s)</Link>
      </div>
      <div>
        <Link to="/allProfiles">Browse Dogs</Link>
      </div>
      <div>
        <Link to="/selectDog">Edit Dogs Profiles</Link>
      </div>
      <div>
        <Link to="/humanEdit">Edit Human Profile</Link>
      </div>
      <div>
        <Link to="/logOut">LogOut</Link>
      </div>
    </div>
  );
};
let renderSelectDogToBeEdited = () => {
  return (
    <div>
      <SelectDogToBeEdited />
      <div>
        <Link to="/dogEdit">Edit Dog Profile</Link>
      </div>
      <div>
        <Link to="/menu">Back to Menu</Link>
      </div>
    </div>
  );
};
let renderDogEdit = () => {
  return (
    <div>
      <DogEdit />
      <div>
        <Link to="/menu">Back to Menu</Link>
      </div>
    </div>
  );
};
let renderHumanEdit = () => {
  return (
    <div>
      <HumanEdit />
      <div>
        <Link to="/menu">Back to Menu</Link>
      </div>
    </div>
  );
};
let renderSignUp = () => {
  return (
    <div>
      <Signup />
      <div>
        <Link to="/menu">Back to Menu</Link>
      </div>
    </div>
  );
};

let renderCreateDog = () => {
  return (
    <div>
      <CreateDog />
      <div>
        <Link to="/menu">Back to Menu</Link>
      </div>
    </div>
  );
};

let renderMyDogs = () => {
  return (
    <div>
      <MyDogs />
      <div>
        <Link to="/menu">Back to Menu</Link>
      </div>
    </div>
  );
};

let renderAllProfiles = () => {
  return (
    <div>
      <SearchBar />
      <div>
        <AllProfiles />
        <div>
          <Link to="/menu">Back to Menu</Link>
        </div>
      </div>
    </div>
  );
};

let renderProfileDetails = routerData => {
  let dogId = routerData.match.params.sid;
  return (
    <div>
      <div>
        <ProfileDetails dogId={dogId} />
        <div>
          <Link to="/allProfiles">Back to Browse Dogs</Link>
        </div>
      </div>
    </div>
  );
};
let renderMessageMyHuman = routerData => {
  let dogID = routerData.match.params.rid;
  return (
    <div>
      <MessageMyHuman dogID={dogID} />
      <div>
        <Link to="/allProfiles">Back to Browse Dogs</Link>
      </div>
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
      <div>
        <Link to="/">Back to Login</Link>
      </div>
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
