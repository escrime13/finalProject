import { createStore } from "redux";
let reducer = (state, action) => {
  if (action.type === "login-success") {
    return { ...state, loggedIn: true };
  }
  if (action.type === "sign-up") {
    return { ...state, signUp: true };
  }
  if (action.type === "edit-dog") {
    return { ...state, dogToEdit: action.eDog };
  }
  if (action.type === "query") {
    return { ...state, searchQuery: action.query };
  }
  if (action.type === "queryLookingFor") {
    return { ...state, queryLookingFor: action.queryLookingFor };
  }
  if (action.type === "queryAge") {
    if (action.queryAge === "empty") {
      return { ...state, queryAge: "" };
    }
    return { ...state, queryAge: action.queryAge };
  }
  if (action.type === "queryDogSex") {
    if (action.queryDogSex === "empty") {
      return { ...state, queryDogSex: "" };
    }
    return { ...state, queryDogSex: action.queryDogSex };
  }
  if (action.type === "queryBreed") {
    if (action.queryDBreed === "empty") {
      return { ...state, queryBreed: "" };
    }
    return { ...state, queryBreed: action.queryBreed };
  }
  return state;
};
let initialState = {
  loggedIn: false,
  signUp: false,
  dogToEdit: "",
  searchQuery: "",
  queryLookingFor: "",
  queryAge: "",
  queryDogSex: ""
};
const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
