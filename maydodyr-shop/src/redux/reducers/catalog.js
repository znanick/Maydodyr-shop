import { SET_CATALOG, ADD_ITEM } from "../actions/catalog";

const initialState = {
  catalog: [
    {
      id: 0,
      name: "Средство щелочное для пола",
      producer: "NovelHim",
      section: "floor",
    },
  ],
};

function catalogReducer(state = [initialState], action) {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        catalog: [...state.catalog, action.item],
      };
    case SET_CATALOG:
      console.log("action:", action);
      console.log("state до обработки редьюсером:", state);

      let newState = {
        ...state,
        catalog: [action.item],
      };

      console.log("state после обработки редьюсером:", newState);
      return newState;
    default:
      return state;
  }
}

export default catalogReducer;
