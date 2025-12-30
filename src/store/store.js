import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cartReducer from "./cartslice";
import formReducer from "./form";
import users from "./usersSlice";
import carts from "./cartsSlice";
// sotre states global
export const store = configureStore({
  reducer: {
    // user =>useselector(state=>state.user)
    user: userReducer,
    cart: cartReducer,
    form: formReducer,
    users: users,
    carts: carts,
  },
});
