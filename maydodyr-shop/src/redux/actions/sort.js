const SET_QUERY = "SET_QUERY";
const SET_FILTER = "SET_FILTER";

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

export { SET_QUERY, SET_FILTER, set_query, set_filter };
