// src/features/userReducer.js
const initialState = {
  userInfo: null,
};

export const signup = (user) => ({ type: "SIGNUP", payload: user });
export const login = (user) => ({ type: "LOGIN", payload: user });
export const logout = () => ({ type: "LOGOUT" });

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNUP":
      return { ...state, userInfo: action.payload };
    case "LOGIN":
      return { ...state, userInfo: action.payload };
    case "LOGOUT":
      return { ...state, userInfo: null };
    default:
      return state;
  }
};

export default userReducer;
