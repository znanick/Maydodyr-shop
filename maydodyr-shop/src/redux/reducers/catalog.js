import {
  SET_CATALOG,
  SAVE_LAST_PAGE,
  SET_IS_READY,
  SET_CURRENT_PAGE,
} from "../actions/catalog";

const initialState = {
  isReady: false,
  catalog: null,
  lastVisitedPage: "/",
  pageSize: 10,
  totalUserCount: 25,
  currentPage: 1,
};

function catalogReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_LAST_PAGE:
      return {
        ...state,
        lastVisitedPage: action.url,
      };
    case SET_CATALOG:
      let newState = {
        ...state,
        catalog: action.catalogItem,
        isReady: true,
      };

      return newState;
    case SET_IS_READY:
      return {
        ...state,
        isReady: action.status,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.page,
      };
    default:
      return state;
  }
}

export default catalogReducer;
