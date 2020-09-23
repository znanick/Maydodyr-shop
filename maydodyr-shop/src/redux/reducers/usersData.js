import { SET_USERSDATA, LOGOUT, LOGIN } from "../actions/usersData";

const initialState = {
  usersData: null,
  isReady: false,
  activeUserId: "admin",
  isActiveUserAdmin: true,
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
        activeUserId: "",
      };
    case LOGIN:
      return {
        ...state,
        activeUserId: action.userData.id,
        isActiveUserAdmin: action.userData.isAdmin,
      };
    default:
      return state;
  }
}

export default usersReducer;
