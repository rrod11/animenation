import { csrfFetch } from "./csrf";

const ALL_USERS = "session/allUsers";

const allUsers = (payload) => {
  return {
    type: ALL_USERS,
    payload,
  };
};

export const allTheUsers = () => async (dispatch) => {
  const response = await csrfFetch("/api/session/all");
  const users = await response.json();
  dispatch(allUsers(users));
  return users;
};

const initialState = { user: null };

const userReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ALL_USERS:
      const userData = {};
      action.payload.forEach((user) => {
        userData[user.id] = user;
      });
      return userData;
    default:
      return state;
  }
};

export default userReducer;
