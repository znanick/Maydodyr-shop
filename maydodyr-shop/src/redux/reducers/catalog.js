import {
  SET_CATALOG,
  SAVE_LAST_PAGE,
  SET_IS_READY,
  SET_CURRENT_PAGE,
  SET_ITEM,
  SET_LENGTH,
} from "../actions/catalog";

const initialState = {
  isReady: false,
  catalog: null,
  choosenItem: {},
  choosenItemIsReady: false,
  lastVisitedPage: "/",
  pageSize: 10,
  totalUserCount: 0,
  totalUserCountIsReady: false,
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
    case SET_ITEM:
      return {
        ...state,
        choosenItemIsReady: true,
        choosenItem: action.item,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.page,
      };
    case SET_LENGTH:
      return {
        ...state,
        totalUserCount: action.length,
        totalUserCountIsReady:true
      };
    default:
      return state;
  }
}

export default catalogReducer;
