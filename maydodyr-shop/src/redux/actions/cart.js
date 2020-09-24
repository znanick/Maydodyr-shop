const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";
const LOAD_ITEMS = "LOAD_ITEMS";


const add_item = function (itemId) {
  return {
    type: ADD_ITEM,
    itemId: itemId,
  };
};

const remove_item = function (itemId) {
  return {
    type: REMOVE_ITEM,
    itemId: itemId,
  };
};

const load_items = function (items) {
  return {
    type: LOAD_ITEMS,
    items: items,
  };
};


export {
  ADD_ITEM,
  add_item,
  REMOVE_ITEM,
  remove_item,
  LOAD_ITEMS,
  load_items,
  
};
