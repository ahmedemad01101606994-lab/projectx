import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// استرجاع العربة من localStorage وحساب المجموع مباشرة
const cartItemsFromStorage =
  JSON.parse(localStorage.getItem("cartItems")) || [];
const initialState = {
  cartItems: cartItemsFromStorage,
  totalamount: cartItemsFromStorage.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  ),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((p) => p.id === item.id);

      if (existItem) {
        existItem.quantity++;
        toast.success(
          `${item.title} quantity increased to ${existItem.quantity}`
        );
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
        toast.success(`${item.title} added to cart`);
      }

      cartSlice.caseReducers.getTotals(state);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((p) => p.id !== id);
      cartSlice.caseReducers.getTotals(state);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalamount = 0;
      localStorage.removeItem("cartItems");
    },

    increasequantity: (state, action) => {
      const id = action.payload;
      const item = state.cartItems.find((p) => p.id === id);
      if (item) item.quantity++;
      cartSlice.caseReducers.getTotals(state);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    decreasequantity: (state, action) => {
      const id = action.payload;
      const item = state.cartItems.find((p) => p.id === id);
      if (item && item.quantity > 1) item.quantity--;
      cartSlice.caseReducers.getTotals(state);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    getTotals: (state) => {
      state.totalamount = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increasequantity,
  decreasequantity,
  getTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
