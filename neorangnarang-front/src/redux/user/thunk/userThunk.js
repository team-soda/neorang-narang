import { createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "../../../service/UserService";

const USER = "user";

export const getUserInfo = createAsyncThunk(
  `${USER}/getUserInfo`,
  async (uid) => {
    const response = await userService.getUserByUid(uid);
    return response.data.objData;
  }
);

export const getUserImg = createAsyncThunk(
  `${USER}/getUserImg`,
  async (fileName) => {
    const response = await userService.getProfileImg(fileName);
    return response;
  }
);
