import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, BrowserRouter, Link, useParams } from "react-router-dom";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import CreateDog from "./CreateDog.jsx";
import MyDogs from "./MyDogs.jsx";
import AllProfiles from "./AllProfiles.jsx";
import SearchCriteria from "./SearchCriteria.jsx";
import SearchResults from "./SearchResults.jsx";
import ProfileDetails from "./ProfileDetails.jsx";
import HumanEdit from "./HumanEdit.jsx";
import SelectDogToBeEdited from "./SelectDogToBeEdited.jsx";
import DogEdit from "./DogEdit.jsx";
import messageMyHuman from "/MessageMyHuman.jsx";
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
      <AllProfiles />
      <div>
        <Link to="/searchCriteria">Search</Link>
      </div>
      <div>
        <Link to="/menu">Back to Menu</Link>
      </div>
    </div>
  );
};

let renderSearchCriteria = () => {
  return (
    <div>
      <SearchCriteria />
      <div>
        <Link to="/menu">Back to Menu</Link>
      </div>
    </div>
  );
};
let renderSearchResults = () => {
  return (
    <div>
      <SearchResults />
      <div>
        <Link to="/searchCriteria">Back to Search</Link>
      </div>
    </div>
  );
};
let renderProfileDetails = routerData => {
  let dogId = routerData.match.params.sid;
  return (
    <div>
      <ProfileDetails dogId={dogId} />
      <div>
        <Link to="/allProfiles">Back to Browse Dogs</Link>
      </div>
    </div>
  );
};
let renderMessageMyHuman = routerData => {
  let dogId = routerData.match.params.rid;
  return (
    <div>
      <MessageMyHuman dogId={dogId} />
      <div>
        <Link to="/allProfiles">Back to Browse Dogs</Link>
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
          <Route exact={true} path="/signup" render={renderSignUp} />
          <Route exact={true} path="/createdog" render={renderCreateDog} />
          <Route exact={true} path="/menu" render={renderMenu} />
          <Route exact={true} path="/mydogs" render={renderMyDogs} />
          <Route exact={true} path="/allProfiles" render={renderAllProfiles} />
          <Route exact={true} path="/dogEdit" render={renderDogEdit} />
          <Route exact={true} path="/humanEdit" render={renderHumanEdit} />
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
