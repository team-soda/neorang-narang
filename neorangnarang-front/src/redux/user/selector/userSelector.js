import { createSelector } from "@mui/x-data-grid/utils/createSelector";

const getUserState = createSelector(
  (state) => state.user.userInfo,
  (userInfo) => userInfo
);

const getDefaultImgState = createSelector(
  (state) => state.user.defaultImg,
  (defaultImg) => defaultImg
);

export { getUserState, getDefaultImgState };
