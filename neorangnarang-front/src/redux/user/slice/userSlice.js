import { createSlice } from "@reduxjs/toolkit";
import { getUserImg, getUserInfo } from "../thunk/userThunk";

const userInitState = {
  userInfo: {},
  defaultImg: "/img/default-profile-img.png",
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.fulfilled, (state, { payload }) => {
      state.userInfo = payload;
    });
  },
});

export default userSlice.reducer;
