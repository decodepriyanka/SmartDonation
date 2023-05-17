import { configureStore } from "@reduxjs/toolkit";
// import cartCountSliceReducer from "./slices/cartCountSlice";
import restaurantSliceReducer from "./slices/restaurantSlice";
import authSliceReducer from "./slices/Slices/authSlice";
import cartSliceReducer from "./slices/Slices/cartSlice";
import ngoSliceReducer from "./slices/Slices/ngoSlices";
import notificationSliceReducer from "./slices/Slices/notificationSlice";

export const store = configureStore({
  reducer: {
    restaurant: restaurantSliceReducer,
    auth: authSliceReducer,
    cart: cartSliceReducer,
    ngo: ngoSliceReducer,
    notification: notificationSliceReducer,
  },
});
