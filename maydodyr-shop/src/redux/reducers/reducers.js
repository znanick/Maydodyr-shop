import { combineReducers } from "redux";

import catalogReducer from "./catalog";
import sortReducer from "./sort";
import usersReducer from "./usersData";

let combinedReducer = combineReducers({
  itemsCatalog: catalogReducer,
  sort: sortReducer,
  usersData:usersReducer
});

export default combinedReducer;
