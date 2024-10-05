import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import itemReducer from "../features/item/itemSlice";
import cartReducer from "../features/cart/cartSlice";
import cartItemReducer  from "../features/cartItem/cartItemSlice"
import paymentReducer  from "../features/payment/paymentSlice"
import materialReducer from "../features/material/materialSlice";
import galleryReducer from "../features/gallery/gallerySlice"; // Import galleryReducer

const rootReducer = combineReducers({
  user: userReducer,
  item: itemReducer,
  cart: cartReducer,
  cartItem: cartItemReducer,
  payment: paymentReducer,
  material: materialReducer,
  gallery: galleryReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;