import { createSlice } from "@reduxjs/toolkit";

const getUsersFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem("users")) || [];
  } catch {
    return [];
  }
};

const dashuserSlice = createSlice({
  name: "users",
  initialState: {
    users: getUsersFromStorage(),
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((u) => u.id !== action.payload);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    editUser: (state, action) => {
      const i = state.users.findIndex((u) => u.id === action.payload.id);
      if (i !== -1) {
        state.users[i] = action.payload;
        localStorage.setItem("users", JSON.stringify(state.users));
      }
    },
  },
});

export const { addUser, deleteUser, editUser } = dashuserSlice.actions;
export default dashuserSlice.reducer;
