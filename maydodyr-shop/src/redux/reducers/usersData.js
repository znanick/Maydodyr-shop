import { SET_USERSDATA, LOGOUT, LOGIN } from "../actions/usersData";

const initialState = {
  usersData: null,
  isReady: false,
  activeUser: null,
  isActiveUserAdmin: false,
};

function usersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USERSDATA:
      let newState = {
        ...state,
        usersData: action.usersDataBase,
        isReady: true,
      };
      return newState;
    case LOGOUT:
      return {
        ...state,
        isActiveUserAdmin: false,
        activeUser: null,
      };
    case LOGIN:
      return {
        ...state,
        activeUser: action.userData,
        isActiveUserAdmin: action.userData.isAdmin,
      };
    default:
      return state;
  }
}

export default usersReducer;
