import { createSlice } from "@reduxjs/toolkit";
const init = JSON.parse(localStorage.getItem("products")) || [];

const formslice = createSlice({
  name: "form",
  initialState: {
    products: Array.isArray(init) ? init : [], // حماية
  },
  reducers: {
    addform: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.products = action.payload;
      } else if (action.payload) {
        state.products.push(action.payload);
      }

      localStorage.setItem("products", JSON.stringify(state.products));
    },
  },
});

export const { addform } = formslice.actions;
export default formslice.reducer;
