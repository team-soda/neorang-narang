import { createSelector } from "@reduxjs/toolkit";

const getAuthState = createSelector(
  (state) => state.auth.authInfo,
  (authInfo) => authInfo
);

const getAuthFileNameState = createSelector(
  (state) => state.auth.fileName,
  (fileName) => fileName
);

const getAuthImgState = createSelector(
  (state) => state.auth.profileImgView,
  (profileImgView) => profileImgView
);

const getIsLoginState = createSelector(
  (state) => state.auth.isLogin,
  (isLogin) => isLogin
);

export { getAuthState, getAuthFileNameState, getAuthImgState, getIsLoginState };
