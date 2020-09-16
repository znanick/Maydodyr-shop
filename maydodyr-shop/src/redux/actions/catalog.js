const ADD_ITEM='ADD_ITEM';
const SET_CATALOG='SET_CATALOG';

const add_item=function(item) {
  return {
    type: ADD_ITEM,
    item:item,
  };
}

const set_catalog=function(item) {
  return {
    type: SET_CATALOG,
    item:item,
   
  };
}

export {
  set_catalog,SET_CATALOG,
  add_item,ADD_ITEM,
}
