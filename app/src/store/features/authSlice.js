import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  token: null,
  loggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: action.payload.name,
          token: action.payload.token,
        }),
      );
      state.name = action.payload.name;
      state.token = action.payload.token;
      state.loggedIn = true;
    },
    clearUser: (state) => {
      localStorage.removeItem("user");
      state.name = null;
      state.token = null;
      state.loggedIn = false;
    },
  },
});

export const selectAuth = (state) => state.auth;

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
