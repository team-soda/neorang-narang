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
  reducers: {
    setIsLogin: (state) => {
      state.isLogin = true;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(login.fulfilled, (state, { payload }) => {
          console.log(payload);
          state.isLogin = true;
          sessionStorage.setItem("accessToken", payload.accessToken);
        })
        .addCase(getAuthUser.fulfilled, (state, { payload }) => {
          console.log(payload);
          state.isLogin = true;
          state.authInfo = payload;
          if (payload.profile_img) {
            const local = `E:\\workspace\\spring-upload\\`;
            state.fileName = payload.profile_img.replace(local, "");
          }
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

export const { setIsLogin } = authSlice.actions;

export default authSlice.reducer;