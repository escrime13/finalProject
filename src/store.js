import { createStore } from "redux";
let reducer = (state, action) => {
  if (action.type === "login-success") {
    return { ...state, loggedIn: true };
  }
  if (action.type === "sign-up") {
    return { ...state, signUp: true };
  }
  if (action.type === "create-dog") {
    let newClick = createDog;
    console.log("createDog: ", createDog);
    newClick = !state.createDog;
    return { ...state, createDog: newClick };
  }
  return state;
};
let initialState = {
  loggedIn: false,
  signUp: false,
  createDog: false
};
const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
