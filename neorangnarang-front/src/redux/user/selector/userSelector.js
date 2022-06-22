import { createSelector } from "@mui/x-data-grid/utils/createSelector";

const getUserState = createSelector(
  (state) => state.user.userInfo,
  (userInfo) => userInfo
);

const getUserFileNameState = createSelector(
  (state) => state.user.fileName,
  (fileName) => fileName
);

const getUserImgState = createSelector(
  (state) => state.user.profileImgView,
  (profileImgView) => profileImgView
);

export { getUserState, getUserFileNameState, getUserImgState };
