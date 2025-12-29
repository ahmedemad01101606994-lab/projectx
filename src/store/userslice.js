import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
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

export const { setuser, clearuser } = userSlice.actions;
export default userSlice.reducer;
