const SAVE_LAST_PAGE = "SAVE_LAST_PAGE";
const SET_CATALOG = "SET_CATALOG";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_ITEM = "SET_ITEM";
const SET_LENGTH = "SET_LENGTH";

const save_last_page = function (url) {
  return {
    type: SAVE_LAST_PAGE,
    url: url,
  };
};

const set_catalog = function (item) {
  return {
    type: SET_CATALOG,
    catalogItem: item,
  };
};

const set_current_page = function (page) {
  return {
    type: SET_CURRENT_PAGE,
    page: page,
  };
};

const set_item = function (item) {
  return {
    type: SET_ITEM,
    item: item,
  };
};

const set_length = function (length) {
  return {
    type: SET_LENGTH,
    length: length,
  };
};

export {
  set_catalog,
  SET_CATALOG,
  save_last_page,
  SAVE_LAST_PAGE,
  set_current_page,
  SET_CURRENT_PAGE,
  set_item,
  SET_ITEM,
  set_length,
  SET_LENGTH
};
