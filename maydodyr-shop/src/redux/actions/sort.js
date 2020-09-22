const SET_QUERY = "SET_QUERY";
const SET_FILTER = "SET_FILTER";
const SET_SECTION = 'SET_SECTION'

const set_query = function (value) {
  return {
    type: SET_QUERY,
    value: value,
  };
};

const set_filter = function (filter) {
  return {
    type: SET_FILTER,
    filter: filter,
  };
};

const set_section = function (section) {
  return {
    type: SET_SECTION,
    section: section,
  };
};

export { SET_QUERY, SET_FILTER, SET_SECTION,set_query, set_filter , set_section};
