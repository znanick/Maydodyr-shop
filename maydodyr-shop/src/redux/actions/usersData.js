const SET_USERSDATA = "SET_USERSDATA";
const LOGOUT = "LOGOUT";
const LOGIN = "LOGIN";

const set_userData = function (usersDataBase) {
  return {
    type: SET_USERSDATA,
    usersDataBase: usersDataBase,
  };
};

const logout = function () {
  return {
    type: LOGOUT,
  };
};

const login = function (userData) {
  return {
    type: LOGIN,
    userData: userData,
  };
};

export { logout, set_userData, SET_USERSDATA, LOGOUT, LOGIN, login };
