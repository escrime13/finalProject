import { createStore } from "redux";
let reducer = (state, action) => {
  if (action.type === "login-success") {
    return { ...state, loggedIn: true };
  }
  if (action.type === "logout-success") {
    return { ...state, loggedIn: false };
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
    if (action.queryBreed === "empty") {
      return { ...state, queryBreed: "" };
    }
    return { ...state, queryBreed: action.queryBreed };
  }
  if (action.type === "queryHeight") {
    if (action.queryHeight === "empty") {
      return { ...state, queryHeight: "" };
    }
    return { ...state, queryHeight: action.queryHeight };
  }
  if (action.type === "queryWeight") {
    if (action.queryWeight === "empty") {
      return { ...state, queryWeight: "" };
    }
    return { ...state, queryWeight: action.queryWeight };
  }
  if (action.type === "queryEnergyLevel") {
    if (action.queryEnergyLevel === "empty") {
      return { ...state, queryEnergyLevel: "" };
    }
    return { ...state, queryEnergyLevel: action.queryEnergyLevel };
  }
  return state;
};
let initialState = {
  loggedIn: true,
  dogToEdit: "",
  searchQuery: "",
  queryLookingFor: "",
  queryAge: "",
  queryDogSex: "",
  queryBreed: "",
  queryHeight: "",
  queryWeight: "",
  queryEnergyLevel: ""
};
const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
