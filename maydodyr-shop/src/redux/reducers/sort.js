import { SET_QUERY, SET_FILTER, SET_SECTION } from "../actions/sort";

const initialState = {
  searchQuery: "",
  filterBy: "all",
  section: "",
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
    case SET_SECTION:
      return {
        ...state,
        section: action.section,
      };
    default:
      return state;
  }
}

export default sortReducer;
