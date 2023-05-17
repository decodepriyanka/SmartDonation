import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOnboardingDisabled: false,
  isLoggedIn: false,
  user: {},
  accessToken: "",
  appMode: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    UPDATE_ONBOARDING_STATUS: (auth, action) => {
      auth.isOnboardingDisabled = action.payload.status;
    },

    UPDATE_USER_LOGIN: (auth, action) => {
      auth.isLoggedIn = action.payload.isLoggedIn;
      auth.user = action.payload.user;
    },

    UPDATE_USER_ACCESS_TOKEN: (auth, action) => {
      auth.accessToken = action.payload.accessToken;
    },

    UPDATE_APP_MODE_TYPE: (auth, action) => {
      auth.appMode = action.payload.mode;
    },
  },
});

export const {
  UPDATE_APP_MODE_TYPE,
  UPDATE_ONBOARDING_STATUS,
  UPDATE_USER_ACCESS_TOKEN,
  UPDATE_USER_LOGIN,
} = authSlice.actions;
export default authSlice.reducer;
