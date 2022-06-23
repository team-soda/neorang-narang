import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import {
  getAuthUser,
  getAuthUserImg,
  login,
  logout,
  updateUser,
  uploadProfileImg,
} from "../thunk/authThunk";

const authIntiState = {
  authInfo: {},
  fileName: null,
  defaultImg: "/img/default-profile-img.png",
  tempPath: null,
  isLogin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: authIntiState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, { payload }) => {
        console.log(payload);
        sessionStorage.setItem("accessToken", payload.accessToken);
        state.isLogin = true;
      })
      .addCase(getAuthUser.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.authInfo = payload;
        if (payload.profile_img) {
          const local = `E:\\workspace\\spring-upload\\`;
          state.fileName = payload.profile_img.replace(local, "");
        }
        state.isLogin = true;
        //console.log(state.fileName);
      })
      .addCase(getAuthUserImg.fulfilled, (state, { payload }) => {
        //state.profileImgView = payload;
      })
      .addCase(uploadProfileImg.fulfilled, (state, { payload }) => {
        state.tempPath = payload.path;
        state.fileName = payload.newName;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.authInfo = payload;
      })
      .addCase(logout.fulfilled, (state) => {
        sessionStorage.clear();
        state.authIntiState = authIntiState;
      })
      .addCase(PURGE, () => authIntiState);
  },
});

export default authSlice.reducer;
