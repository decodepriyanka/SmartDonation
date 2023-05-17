import { SET_NOTIFICATION } from "../Slices/notificationSlice";

export const setNotificationData = (data, dispatch) => {
  dispatch(
    SET_NOTIFICATION({
      data,
    })
  );
};
