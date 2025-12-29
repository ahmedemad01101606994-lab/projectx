import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
};

const cartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addCart: (state, action) => {
      state.carts.push({ id: Date.now(), ...action.payload });
    },
    deleteCart: (state, action) => {
      state.carts = state.carts.filter((cart) => cart.id !== action.payload);
    },
    updateCart: (state, action) => {
      const index = state.carts.findIndex(
        (cart) => cart.id === action.payload.id
      );
      if (index !== -1) state.carts[index] = action.payload;
    },
  },
});

export const { addCart, deleteCart, updateCart } = cartsSlice.actions;
export default cartsSlice.reducer;
