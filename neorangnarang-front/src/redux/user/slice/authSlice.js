import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import { getAuthUser, login, logout, updateUser } from "../thunk/authThunk";

const authIntiState = {
  authInfo: {},
  defaultImg: "/img/default-profile-img.png",
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
        sessionStorage.setItem("accessToken", payload.accessToken);
        state.authInfo = payload.user;
        state.isLogin = true;
      })
      .addCase(getAuthUser.fulfilled, (state, { payload }) => {
        state.authInfo = payload;
        state.isLogin = true;
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
