import { createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "../../../service/UserService";

const AUTH = "auth";

export const login = createAsyncThunk(`${AUTH}/login`, async (loginObj) => {
  console.log(loginObj);
  try {
    const response = await userService.login(loginObj);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const getAuthUser = createAsyncThunk(`${AUTH}/getAuthUser`, async () => {
  try {
    const response = await userService.getAuthUserInfo();
    console.log("createAsyncThunk getAuthUser");
    console.log(response);
    return response.data.user;
  } catch (error) {
    console.log(error);
    return false;
  }
});

export const updateUser = createAsyncThunk(
  `${AUTH}/updateUser`,
  async (userObj) => {
    console.log(userObj);
    try {
      const response = await userService.updateUser(userObj);
      console.log(response);
      alert("수정 완료!");
      window.location.reload();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const logout = createAsyncThunk(`${AUTH}/logout`, async () => {
  try {
    return await userService.logout();
  } catch (error) {
    console.log(error);
  }
});
