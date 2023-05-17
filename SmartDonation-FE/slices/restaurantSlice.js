import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurant: [],
};

export const restaurantSlice = createSlice({
  name: "Restaurant",
  initialState,
  reducers: {
    setRestaurant: (state, action) => {
      state.restaurant = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRestaurant } = restaurantSlice.actions;

export const getRestaurant = (state) => state.restaurant.restaurant;

export default restaurantSlice.reducer;
