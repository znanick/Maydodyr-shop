import { combineReducers } from "redux";

import catalogReducer from "./catalog";
import sortReducer from "./sort";

let combinedReducer = combineReducers({
  itemsCatalog: catalogReducer,
  sort: sortReducer,
});

export default combinedReducer;
