// name
// intinalstate
// reducer

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userinfo: null,
    islogined: false,
  },
  reducers: {
    setuser: (state, action) => {
      // action.payload=> data=>dispatch
      state.userinfo = action.payload;
      state.islogined = true;
    },
    clearuser: (state) => {
      state.userinfo = null;
      state.islogined = false;
    },
  },
});
// export reducer
export const { setuser, clearuser } = userSlice.actions;
// export state
export default userSlice.reducer;
