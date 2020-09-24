import { ADD_ITEM, REMOVE_ITEM, LOAD_ITEMS } from "../actions/cart";

const initialState = {
  items: [],
  isItemsReady:false,
  itemsId: [],
  isItemsIdReady:false
};

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        itemsId: action.itemId,
        isItemsIdReady: true
      };
    case REMOVE_ITEM:
      return {
        ...state,
        itemsId: state.itemsId.filter((el) => el !== action.itemId),
        
      };
    case LOAD_ITEMS:
      return {
        ...state,
        items: action.items,
        isItemsReady:true
      };
    default:
      return state;
  }
}

export default cartReducer;
