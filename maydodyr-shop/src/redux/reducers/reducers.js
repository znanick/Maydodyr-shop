import { combineReducers } from "redux";

import catalogReducer from "./catalog";
import sortReducer from "./sort";
import usersReducer from "./usersData";
import cartReducer from "./cart";

let combinedReducer = combineReducers({
  itemsCatalog: catalogReducer,
  sort: sortReducer,
  usersData:usersReducer,
  cart: cartReducer
});

export default combinedReducer;
