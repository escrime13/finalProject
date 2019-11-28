import { createStore } from "redux";
let reducer = (state, action) => {
  if (action.type === " x") {
    return { ...state };
  }
  return state;
};
let initialState = {};
const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DETOOLS_EXTENSION__()
);
export default store;
