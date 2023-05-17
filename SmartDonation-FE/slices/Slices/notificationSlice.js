import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificationArray: [],
};

export const notificationSlices = createSlice({
  name: "notification",
  initialState,
  reducers: {
    SET_NOTIFICATION: (notification, action) => {
      notification.notificationArray = action?.payload?.data;
    },
  },
});

export const { SET_NOTIFICATION } = notificationSlices.actions;
export default notificationSlices.reducer;
