// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  email: "",
  username: "",
  avatar: "",
  _id: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state._id = action.payload._id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.avatar = action.payload.avatar;
    },
    logout: (state) => {
      state._id = "";
      state.username = "";
      state.email = "";
      state.avatar = "";
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
