import { createSlice } from "@reduxjs/toolkit";

const usernameSlice = createSlice({
  name: "username",
  initialState: {
    username: null,
    token: null,
  },
  reducers: {
    login: (state, action) => {
      return (state = {
        username: action.payload.username,
        token: action.payload.token,
      });
    },
    logout: (state) => {
      return (state = {
        username: null,
        token: null,
      });
    },
  },
});

export const { login, logout } = usernameSlice.actions;

// export const selectUser = (state) => state.username.username;

export default usernameSlice.reducer;
