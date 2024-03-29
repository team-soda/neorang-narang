import { createSelector } from "@reduxjs/toolkit";

const getAuthState = createSelector(
  (state) => state.auth.authInfo,
  (authInfo) => authInfo
);

const getDefaultImgState = createSelector(
  (state) => state.auth.defaultImg,
  (defaultImg) => defaultImg
);

const getIsLoginState = createSelector(
  (state) => state.auth.isLogin,
  (isLogin) => isLogin
);

export { getAuthState, getDefaultImgState, getIsLoginState };
