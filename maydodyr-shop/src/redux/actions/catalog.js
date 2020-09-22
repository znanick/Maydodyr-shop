const SAVE_LAST_PAGE = "SAVE_LAST_PAGE";
const SET_CATALOG = "SET_CATALOG";
const SET_IS_READY = "SET_IS_READY";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";

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

const set_is_ready = function (status) {
  return {};
};

export {
  set_catalog,
  SET_CATALOG,
  save_last_page,
  SAVE_LAST_PAGE,
  set_is_ready,
  SET_IS_READY,
  set_current_page,
  SET_CURRENT_PAGE,
};
