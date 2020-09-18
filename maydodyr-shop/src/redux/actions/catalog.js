const ADD_ITEM='ADD_ITEM';
const SET_CATALOG='SET_CATALOG';
const SET_IS_READY ='SET_IS_READY'

const add_item=function(item) {
  return {
    type: ADD_ITEM,
    item:item,
  };
}

const set_catalog=function(item) {
  return {
    type: SET_CATALOG,
    catalogItem:item,
   
  };
}

const set_is_ready = function(status){
  return{}
}

export {
  set_catalog,SET_CATALOG,
  add_item,ADD_ITEM,
  set_is_ready,SET_IS_READY
}
