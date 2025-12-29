import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cartReducer from "./cartslice";
import formslice from "./form";
import users from "./usersSlice";
import cartssilce from "./cartsSlice";
// sotre states global
export const store = configureStore({
  reducer: {
    // user =>useselector(state=>state.user)
    user: userReducer,
    cart: cartReducer,
    form: formslice,
    users: users,
    carts: cartssilce,
  },
});
