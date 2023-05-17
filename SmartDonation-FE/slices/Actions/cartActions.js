import {
  DECREMENT,
  INCREMENT,
  REMOVE_ITEM,
  RESET_TO_ZERO,
} from "../Slices/cartSlice";

export const incrementCart = (value, cartObj, dispatch) => {
  dispatch(
    INCREMENT({
      value,
      cartObj,
    })
  );
};

export const decrementCart = (id, dispatch) => {
  dispatch(
    DECREMENT({
      id,
    })
  );
};

export const resetCart = (value, cartObj, dispatch) => {
  dispatch(
    RESET_TO_ZERO({
      value,
      cartObj,
    })
  );
};

export const removeItem = (id, dispatch) => {
  dispatch(
    REMOVE_ITEM({
      id,
    })
  );
};
