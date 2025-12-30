import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    userinfo: null,
    islogined: false,
  },
  reducers: {
    setuser: (state, action) => {
      state.userinfo = action.payload;
      state.islogined = true;
    },
    clearuser: (state) => {
      state.userinfo = null;
      state.islogined = false;
    },
  },
});

export const { setuser, clearuser } = user.actions;
export default user.reducer;
