import { SET_CATALOG, ADD_ITEM, SET_IS_READY } from "../actions/catalog";

const initialState = {
  isReady: false,
  catalog: null,
  
};

function catalogReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      return {};
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
    default:
      return state;
  }
}

export default catalogReducer;
