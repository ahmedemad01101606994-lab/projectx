import { createSlice } from "@reduxjs/toolkit";

const storedProducts = JSON.parse(localStorage.getItem("products")) || [];

const formSlice = createSlice({
  name: "form",
  initialState: {
    products: storedProducts, // المنتجات الجديدة فقط
  },
  reducers: {
    addform: (state, action) => {
      state.products.push(action.payload);
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (p) => String(p.id) !== String(action.payload)
      );
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    editProduct: (state, action) => {
      const index = state.products.findIndex(
        (p) => String(p.id) === String(action.payload.id)
      );
      if (index !== -1) {
        state.products[index] = action.payload;
        localStorage.setItem("products", JSON.stringify(state.products));
      }
    },
  },
});

export const { addform, deleteProduct, editProduct } = formSlice.actions;
export default formSlice.reducer;
