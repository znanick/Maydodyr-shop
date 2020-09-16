import { combineReducers } from "redux";

import catalogReducer from "./catalog";

let combinedReducer = combineReducers({
  catalog:catalogReducer,
});

export default combinedReducer;
