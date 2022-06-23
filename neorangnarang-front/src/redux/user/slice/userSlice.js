import { createSlice } from "@reduxjs/toolkit";
import { getUserImg, getUserInfo } from "../thunk/userThunk";

const userInitState = {
  userInfo: null,
  fileName: "",
  profileImgView: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.fulfilled, (state, { payload }) => {
        const local = `E:\\workspace\\spring-upload\\`;
        state.userInfo = payload;
        state.fileName = payload.profile_img?.replace(local, "");
      })
      .addCase(getUserImg.fulfilled, (state, { payload }) => {
        state.profileImgView = payload;
      });
  },
});

export default userSlice.reducer;
