import {
  UPDATE_APP_MODE_TYPE,
  UPDATE_ONBOARDING_STATUS,
  UPDATE_USER_ACCESS_TOKEN,
  UPDATE_USER_LOGIN,
} from "../Slices/authSlice";

export const updateOnboarding = (status, dispatch) => {
  dispatch(
    UPDATE_ONBOARDING_STATUS({
      status,
    })
  );
};

export const updateUserLogin = (user, isLoggedIn, dispatch) => {
  dispatch(
    UPDATE_USER_LOGIN({
      user,
      isLoggedIn,
    })
  );
};

export const updateUserAccessToken = (accessToken, dispatch) => {
  dispatch(
    UPDATE_USER_ACCESS_TOKEN({
      accessToken,
    })
  );
};

export const updateAppModeType = (mode, dispatch) => {
  dispatch(
    UPDATE_APP_MODE_TYPE({
      mode,
    })
  );
};
