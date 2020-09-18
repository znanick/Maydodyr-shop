import { SET_QUERY, SET_FILTER } from "../actions/sort";

const initialState = {
  searchQuery: "",
  filterBy: "all",
};

function sortReducer(state = initialState, action) {
  switch (action.type) {
    case SET_QUERY:
      return {
        ...state,
        searchQuery: action.value,
      };
    case SET_FILTER:
      return {
        ...state,
        filterBy: action.filter,
      };
    default:
      return state;
  }
}

export default sortReducer;
