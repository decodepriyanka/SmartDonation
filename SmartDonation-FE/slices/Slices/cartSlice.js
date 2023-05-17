import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  cartValue: {},
  cartDetail: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    INCREMENT: (cart, action) => {
      let id = action?.payload?.cartObj?.id;
      let currentValue = current(cart.cartValue);
      let currentIdValue = currentValue[id] ?? 0;
      if (currentIdValue === 0) {
        cart.cartDetail = [...cart.cartDetail, action?.payload?.cartObj];
      }
      cart.cartValue = {
        ...cart?.cartValue,
        [id]: currentIdValue + 1,
      };
    },

    DECREMENT: (cart, action) => {
      let id = action?.payload?.id;
      let currentValue = current(cart.cartValue);
      let currentIdValue = currentValue[id] ?? 0;
      //if element count is one and we want to decrement then we will remove that element also
      if (currentIdValue === 1) {
        const cartItems = [...cart.cartDetail];
        const index = cartItems.findIndex(
          (item) => item.id === action.payload?.id
        );

        if (index >= 0) {
          cartItems.splice(index, 1);
        }
        cart.cartDetail = [...cartItems];
      }
      if (currentIdValue === 0) {
        console.warn("Don't want to donate???");
      }
      cart.cartValue = {
        ...cart?.cartValue,
        [id]: currentIdValue > 1 ? currentIdValue - 1 : 0,
      };
    },

    RESET_TO_ZERO: (cart, action) => {
      cart.cartDetail = [];
      cart.cartValue = {};
    },

    REMOVE_ITEM: (cart, action) => {
      const id = action?.payload?.id;
      const cartItems = [...cart.cartDetail];
      const index = cartItems.findIndex(
        (item) => item.id === action.payload?.id
      );
      if (index >= 0) {
        cartItems.splice(index, 1);
      }
      cart.cartDetail = [...cartItems];
      cart.cartValue = {
        ...cart?.cartValue,
        [id]: 0,
      };
    },
  },
});

export const { INCREMENT, DECREMENT, RESET_TO_ZERO, REMOVE_ITEM } =
  cartSlice.actions;
export default cartSlice.reducer;
