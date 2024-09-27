import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import itemReducer from "../features/item/itemSlice";
import cartReducer from "../features/cart/cartSlice";
import cartItemReducer  from "../features/cartItem/cartItemSlice"
import paymentReducer  from "../features/payment/paymentSlice"
const rootReducer = combineReducers({
  user: userReducer,
  item: itemReducer,
  cart: cartReducer,
  cartItem: cartItemReducer,
  payment: paymentReducer
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;