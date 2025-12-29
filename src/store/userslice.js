// src/store/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userinfo: null,
    isLogined: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.userinfo = action.payload;
      state.isLogined = true;
    },
    clearUser: (state) => {
      state.userinfo = null;
      state.isLogined = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
