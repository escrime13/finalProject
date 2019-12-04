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
  return state;
};
let initialState = {
  loggedIn: false,
  signUp: false,
  dogToEdit: ""
};
const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
